;(function () {
  angular.module('TodoApp').controller('TaskCtrl', [
    '$scope',
    '$routeParams',
    'TodoTaskService',
    '$location',
    function ($scope, $routeParams, TodoTaskService, $location) {
      /**
       * changing heading on todo task form depending on $routeParams.id
       * New todo tasks wont have an id as yet
       */
      $scope.formTitle = $routeParams.id ? 'Edit Task' : 'New Task'
      $scope.todoTasks = []
      fetchAllTodoTasks()

      if (!$routeParams.id) {
        $scope.taskDetails = {}
      } else {
        // cloning object to avoid any changes made to model
        $scope.taskDetails = angular.copy(TodoTaskService.getTodoTaskById(Number($routeParams.id)))
      }

      $scope.handleTaskSave = function () {
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
      }

      $scope.handleTaskDeletion = function () {
        console.log('handleTaskDeletion() method was clicked.')
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
