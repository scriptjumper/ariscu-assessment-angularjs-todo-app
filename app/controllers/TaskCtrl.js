;(function () {
  angular.module('TodoApp').controller('TaskCtrl', [
    '$scope',
    '$routeParams',
    '$location',
    '$route',
    'taskService',
    function ($scope, $routeParams, $location, $route, taskService) {
      // Doing pre controller setup
      $scope.init = function () {
        /**
         * Checking if $routeParams.id exist
         * if true
         *      - change heading for editing to do tasks
         * else
         *      - change heading for creating to do tasks
         */
        $scope.formTitle = $routeParams.id ? 'Edit Task' : 'New Task'

        /**
         * initializing to do tasks array
         *    and
         * query string for searching to do tasks
         */
        $scope.todoTasks = []
        $scope.query = ''

        fetchAllTodoTasks()

        /**
         * Checking if $routeParams.id exist
         * if !$routeParams.id
         *      - create empty to do tasks object
         *      - setting property `isComplete` to false for new tasks
         * else
         *      - create a copy of the to do task with the `$routeParams.id`.
         *
         *        Using `angular.copy()` method to create a copy of task
         *       * (should in some cases a user edits the task
         *       * and click the cancel button the to do task will remain updated in state.)
         *
         *        Calls taskService.getTodoTaskById():
         *          - passing $routeParams.id converted to number should it not be a number.
         *          - returns an object for the task with same `$routeParams.id`
         */
        if (!$routeParams.id) {
          $scope.taskDetails = {
            isComplete: false
          }
        } else {
          $scope.taskDetails = angular.copy(taskService.getTodoTaskById(Number($routeParams.id)))
        }
      }

      /**
       * $scope.handleTaskSave():
       *
       * Checking $routeParams.id to find out which view the user is on
       * and calling the correct service to handle that request
       */
      $scope.handleTaskSave = function () {
        if (!$routeParams.id) {
          taskService.SaveTodoTask($scope.taskDetails).then(
            function (response) {
              handleSavedTask(response)
            },
            function (err) {
              handleSavedTask(err)
            }
          )
        } else {
          taskService.UpdateTodoTask($scope.taskDetails).then(
            function (response) {
              handleSavedTask(response)
            },
            function (err) {
              handleSavedTask(err)
            }
          )
        }
      }

      /**
       * $scope.handleCompleteTask():
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
      $scope.handleCompleteTask = function (id) {
        var taskDetails = angular.copy(taskService.getTodoTaskById(Number(id)))
        taskDetails.isComplete = c

        taskService.UpdateTodoTask(taskDetails).then(
          function (response) {
            if (response.success) {
              $location.path('/')
              fetchAllTodoTasks()
            }
          },
          function (err) {
            $scope.error = err.message
          }
        )
      }

      /**
       * $scope.handleTaskDeletion():
       *
       * Takes param id int
       *
       * Calls taskService.DeleteTodoTask() service
       *  - removes task with the same id from database
       *  - refresh component fetching latest changes in database
       */
      $scope.handleTaskDeletion = function (id) {
        taskService.DeleteTodoTask(id).then(
          function (response) {
            if (response.success) {
              $location.path('/')
              $route.reload()
            }
          },
          function (err) {
            $scope.error = err.message
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
       * binds total number of incomplete tasks to `$scope.inCompleteTasks`
       * $scope.inCompleteTasks will be used in the view
       */
      function inCompleteTasks(tasks) {
        $scope.inCompleteTasks = 0

        tasks.forEach((task) => {
          if (task.isComplete === false) $scope.inCompleteTasks++
        })
      }

      /**
       * fetchAllTodoTasks():
       *  Gets all to do task created by current user,
       *  binds response to `$scope.todoTasks`.
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
              $scope.todoTasks = res.data
              inCompleteTasks(res.data)
            }
          },
          function (err) {
            $scope.error = err.message
          }
        )
      }

      /**
       * handleSavedTask():
       *
       * Takes response from request
       *
       * on success -> route to all tasks screen and call `fetchAllTodoTasks()` method
       *
       * on error -> keep user on page and display error
       */
      function handleSavedTask(response) {
        if (response.success) {
          $location.path('/')
          fetchAllTodoTasks()
          delete $scope.error
        } else {
          $scope.error = response.message
        }
      }

      // calling `$scope.init()` function to setup controller config
      $scope.init()
    }
  ])
})()
