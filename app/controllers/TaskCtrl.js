;(function () {
  angular.module('TodoApp').controller('TaskCtrl', [
    '$scope',
    '$routeParams',
    'TodoTaskService',
    '$location',
    '$route',
    function ($scope, $routeParams, TodoTaskService, $location, $route) {
      /**
       * changing heading on todo task form depending on $routeParams.id
       * New todo tasks wont have an id as yet
       */
      $scope.formTitle = $routeParams.id ? 'Edit Task' : 'New Task'
      $scope.todoTasks = []
      $scope.query = ''
      fetchAllTodoTasks()

      if (!$routeParams.id) {
        $scope.taskDetails = {}
      } else {
        // cloning object to avoid any changes made to model
        $scope.taskDetails = angular.copy(TodoTaskService.getTodoTaskById(Number($routeParams.id)))
      }

      $scope.handleTaskSave = function () {
        if (!$routeParams.id) {
          TodoTaskService.SaveTodoTask($scope.taskDetails, function (response) {
            userIsAuthorised(response)
          })
        } else {
          TodoTaskService.UpdateTodoTask($scope.taskDetails, function (response) {
            userIsAuthorised(response)
          })
        }
      }

      $scope.handleTaskDeletion = function (id) {
        TodoTaskService.DeleteTodoTask(id, function (response) {
          if (response.success) {
            $location.path('/')
            $route.reload()
          } else {
            $scope.error = response.message
          }
        })
      }

      $scope.handleCompleteTask = function (id) {
        var taskDetails = angular.copy(TodoTaskService.getTodoTaskById(Number(id)))
        taskDetails.isComplete = !taskDetails.isComplete

        TodoTaskService.UpdateTodoTask(taskDetails, function (response) {
          if (response.success) {
            // route to todo list screen and call DB for all todo tasks
            $location.path('/')
            fetchAllTodoTasks()
          } else {
            $scope.error = response.message
          }
        })
      }

      function inCompleteTasks(tasks) {
        $scope.inCompleteTasks = 0

        tasks.forEach((task) => {
          if (task.isComplete === false) $scope.inCompleteTasks++
        })
      }

      function fetchAllTodoTasks() {
        TodoTaskService.FetchAllTodoTasks(function (response) {
          if (response.success) {
            $scope.todoTasks = response.data
            inCompleteTasks(response.data)
          } else {
            $scope.error = response.message
          }
        })
      }

      function userIsAuthorised(response) {
        if (response.success) {
          $location.path('/')
          fetchAllTodoTasks()
        } else {
          $scope.error = response.message
        }
      }
    }
  ])
})()
