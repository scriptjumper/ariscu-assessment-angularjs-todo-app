;(function () {
  angular
    .module('app.tasks', [])
    .component('tasks', {
      template: '<ng-outlet></ng-outlet>',
      $routeConfig: [
        { path: '/', name: 'TaskList', component: 'taskList', useAsDefault: true },
        { path: '/new', name: 'TaskDetail', component: 'taskDetail' },
        { path: '/edit/:id', name: 'TaskDetail', component: 'taskDetail' }
      ]
    })
    .component('taskList', {
      template:
        '<div class="text-center mt-md-5">' +
        `   <h2>You've got <span class="emphasis">{{$ctrl.inCompleteTasks}}</span> {{$ctrl.inCompleteTasks > 1 || $ctrl.inCompleteTasks === 0 ? 'things' : 'thing'}} to do</h2>` +
        '</div>' +
        '<div class="row">' +
        '   <div class="col-md-12">' +
        '      <a href="#/tasks/new" class="btn btn-success btn-lg btn-block"><span class="fa fa-plus"></span> New Task</a>' +
        '   </div>' +
        '   <div ng-if="$ctrl.todoTasks.length > 0" class="mb-3 mt-3 btn-lg col-md-12">' +
        '      <input class="form-control" type="text" placeholder="Search To do Task" aria-label="Search" ng-model="$ctrl.query" />' +
        '   </div>' +
        '   <div class="col-md-12 mt-md-2">' +
        '      <ul class="list-group">' +
        '         <ul class="list-group list-group-flush">' +
        `            <li ng-repeat="todoTask in $ctrl.todoTasks | orderBy: 'created_at':true | filter: { title: $ctrl.query }" class="list-group-item text-center" >` +
        '               <span class="float-left">' +
        '               <button type="button" class="btn btn-success" ng-click="$ctrl.handleCompleteTask(todoTask.id)">' +
        `               <span ng-class="{ 'fa fa-check-square': todoTask.isComplete, 'fa fa-square': !todoTask.isComplete }" >` +
        '               </span>' +
        '               </button>' +
        '               </span>' +
        `               <span ng-class="{'completed_task' : todoTask.isComplete === true}">{{todoTask.title}}</span>` +
        '               <span class="float-right">' +
        // href="#/tasks/edit/{{todoTask.id}}"
        '               <a ng-link="[\'TaskDetail\', {id: todoTask.id}]" class="btn btn-primary"><span class="fa fa-pencil"></span></a>' +
        '               <button type="button" class="btn btn-danger" confirmed-click="$ctrl.handleTaskDeletion(todoTask.id)" ng-confirm-click="Are you sure you want to delete Task: {{todoTask.title}} ?">' +
        '               <span class="fa fa-trash"> </span>' +
        '               </button>' +
        '               </span>' +
        '            </li>' +
        '         </ul>' +
        '         <div ng-if="$ctrl.todoTasks.length === 0" class="alert alert-info">' +
        '            <span><i class="fa fa-info"></i> Oops seems like you dont have any To do tasks, to get started click' +
        '            <strong>New Task</strong> button</span>' +
        '         </div>' +
        '      </ul>' +
        '   </div>' +
        '</div>',
      controllerAs: '$ctrl',
      controller: ['$location', '$window', 'taskService', taskListCtrl]
    })
    .component('taskDetail', {
      template:
        '<div class="text-center mt-md-5">' +
        '  <h2>{{$ctrl.formTitle}}</h2>' +
        '</div>' +
        '<div class="row">' +
        '  <div class="col-md-12">' +
        '    <form name="todoTaskForm">' +
        '      <div class="form-group">' +
        '        <input type="text" class="form-control" name="title" ng-model="$ctrl.taskDetails.title" placeholder="Task Title" required />' +
        '      </div>' +
        '      <div class="form-group">' +
        '        <button type="button" class="btn btn-success btn-lg btn-block" ng-click="$ctrl.handleTaskSave()"><span class="fa fa-save"></span> Save</button>' +
        '      </div>' +
        '      <div class="form-group">' +
        '        <a href="#/tasks" class="btn btn-default btn-lg btn-block"><span class="fa fa-remove"></span> Cancel</a>' +
        '      </div>' +
        '    </form>' +
        '  </div>' +
        '</div>' +
        '<div ng-show="$ctrl.error" id="message" style="position: relative; margin-top: 5em;">' +
        '  <div style="padding: 5px;">' +
        '    <span class="fa fa-danger"></span>' +
        '    <div id="inner-message" class="alert alert-danger">{{$ctrl.error}}</div>' +
        '  </div>' +
        '</div>',
      bindings: { $router: '<' },
      controllerAs: '$ctrl',
      controller: ['$location', '$routeParams', 'taskService', taskDetailCtrl]
    })
    .directive('ngConfirmClick', [
      function () {
        return {
          link: function (scope, element, attr) {
            var msg = attr.ngConfirmClick || 'Are you sure?'
            var clickAction = attr.confirmedClick
            element.bind('click', function (event) {
              if (window.confirm(msg)) {
                scope.$eval(clickAction)
              }
            })
          }
        }
      }
    ])

  function taskListCtrl($location, $window, taskService) {
    var $ctrl = this

    // Doing pre controller setup
    $ctrl.init = function () {
      /**
       * initializing to do tasks array
       *    and
       * query string for searching to do tasks
       */
      $ctrl.todoTasks = []
      $ctrl.query = ''

      fetchAllTodoTasks()
    }

    /**
     * $ctrl.handleCompleteTask():
     *
     * Takes id of to do task that was marked as complete
     *  - Calls taskService.getTodoTaskById() to get copy of updated task
     *  - changing isComplete property to its opposite state using the `!` eg. !taskDetails.isComplete
     *
     * Calling taskService.UpdateTodoTask()
     * to update task in database with newer changes
     *
     * Route back to all tasks view and fetch all tasks
     */
    $ctrl.handleCompleteTask = function (id) {
      var taskDetails = angular.copy(taskService.getTodoTaskById(Number(id)))
      taskDetails.isComplete = !taskDetails.isComplete

      taskService.UpdateTodoTask(taskDetails).then(
        function (response) {
          if (response.success) {
            $location.path('/')
            fetchAllTodoTasks()
          }
        },
        function (err) {
          $ctrl.error = err.message
        }
      )
    }

    /**
     * $ctrl.handleTaskDeletion():
     *
     * Takes param id int
     *
     * Calls taskService.DeleteTodoTask() service
     *  - removes task with the same id from database
     *  - refresh component fetching latest changes in database
     */
    $ctrl.handleTaskDeletion = function (id) {
      taskService.DeleteTodoTask(id).then(
        function (response) {
          if (response.success) {
            $location.path('/')
            $window.location.reload()
          }
        },
        function (err) {
          $ctrl.error = err.message
        }
      )
    }

    /**
     * inCompleteTasks():
     *
     * Takes param `tasks` => array
     *
     * Performs check using foreach loop
     * for all tasks that are incomplete
     * binds total number of incomplete tasks to `$ctrl.inCompleteTasks`
     * $ctrl.inCompleteTasks will be used in the view
     */
    function inCompleteTasks(tasks) {
      $ctrl.inCompleteTasks = 0

      tasks.forEach((task) => {
        if (task.isComplete === false) $ctrl.inCompleteTasks++
      })
    }

    /**
     * fetchAllTodoTasks():
     *  Gets all to do task created by current user,
     *  binds response to `$ctrl.todoTasks`.
     *  Calls inCompleteTasks():
     *    - Passes response data
     *
     * Should app not get any tasks data
     * error message will display in view
     */
    function fetchAllTodoTasks() {
      taskService.FetchAllTodoTasks().then(
        function (res) {
          if (res.success) {
            $ctrl.todoTasks = res.data
            inCompleteTasks(res.data)
          }
        },
        function (err) {
          $ctrl.error = err.message
        }
      )
    }

    // calling `$ctrl.init()` function to setup controller config
    $ctrl.init()
  }

  function taskDetailCtrl($location, $routeParams, taskService) {
    var $ctrl = this

    // Doing pre controller setup
    var path = $location.path()
    $ctrl.init = function () {
      /**
       * Checking if $location.path() === '/tasks/new'
       * if true
       *      - change heading for creating to do tasks
       * else
       *      - change heading for editing to do tasks
       */
      $ctrl.formTitle = path === '/tasks/new' ? 'New Task' : 'Edit Task'
    }

    /**
     * $ctrl.handleTaskSave():
     *
     * Checking $location.path() to find out which view the user is on
     * and calling the correct service to handle that request
     */
    $ctrl.handleTaskSave = function () {
      if (path === '/tasks/new') {
        // creating new property in $ctrl.taskDetails for isComplete
        $ctrl.taskDetails.isComplete = false

        taskService.SaveTodoTask($ctrl.taskDetails).then(
          function (response) {
            $location.path('/')
            fetchAllTodoTasks()
            delete $scope.error
          },
          function (err) {
            $scope.error = err.message
          }
        )
      } else {
        taskService.UpdateTodoTask($ctrl.taskDetails).then(
          function (response) {
            if (response.success) {
              $location.path('/')
              fetchAllTodoTasks()
              delete $ctrl.error
            }
          },
          function (err) {
            $ctrl.error = err.message
          }
        )
      }
    }

    this.$routerOnActivate = function (next) {
      // Get the task identified by the route parameter
      var id = Number(next.params.id)
      taskService.getTask(id).then(function (task) {
        $ctrl.taskDetails = task
      })
    }

    // calling `$ctrl.init()` function to setup controller config
    $ctrl.init()
  }
})()
