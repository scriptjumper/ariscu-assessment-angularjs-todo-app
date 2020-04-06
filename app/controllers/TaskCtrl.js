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
            if (response.success) {
              // route to todo list screen and call DB for all todo tasks
              $location.path('/')
              fetchAllTodoTasks()
            } else {
              // TODO: need to add better error handling below
              console.log(response)
            }
          })
        } else {
          TodoTaskService.UpdateTodoTask($scope.taskDetails, function (response) {
            if (response.success) {
              // route to todo list screen and call DB for all todo tasks
              $location.path('/')
              fetchAllTodoTasks()
            } else {
              // TODO: need to add better error handling below
              console.log(response)
            }
          })
        }
      }

      $scope.handleTaskDeletion = function (id) {
        TodoTaskService.DeleteTodoTask(id, function (response) {
          if (response.success) {
            $location.path('/')
            $route.reload()
          } else {
            // TODO: need to add better error handling below
            console.log(response)
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
            // TODO: need to add better error handling below
            console.log(response)
          }
        })
      }

      function fetchAllTodoTasks() {
        TodoTaskService.FetchAllTodoTasks(function (response) {
          if (response.success) {
            $scope.todoTasks = response.data
          } else {
            // TODO: need to add better error handling below
            $scope.error = response.message
          }
        })
      }
    }
  ])
})()
