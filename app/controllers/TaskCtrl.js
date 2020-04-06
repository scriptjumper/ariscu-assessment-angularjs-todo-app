;(function () {
  angular.module('TodoApp').controller('TaskCtrl', [
    '$scope',
    '$routeParams',
    'TodoTaskService',
    function ($scope, $routeParams, TodoTaskService) {
      /**
       * changing heading on todo task form depending on $routeParams.id
       * New todo tasks wont have an id as yet
       */
      $scope.formTitle = $routeParams.id ? 'Edit Task' : 'New Task'
      $scope.todoTasks = []
      $scope.taskDetails = {}
      fetchAllTodoTasks()

      if (!$routeParams.id) {
        $scope.taskDetails = {}
      } else {
        // cloning object to avoid any changes made to model
        $scope.taskDetails = angular.copy(TodoTaskService.getTodoTaskById(Number($routeParams.id)))
      }

      $scope.handleTaskSave = function () {
        console.log('handleTaskSave() method was clicked.')
      }

      $scope.handleTaskDeletion = function () {
        console.log('handleTaskDeletion() method was clicked.')
      }

      function fetchAllTodoTasks() {
        TodoTaskService.FetchAllTodoTasks(function (response) {
          if (response.success) {
            $scope.todoTasks = response.data
          } else {
            $scope.error = response.message
          }
        })
      }
    }
  ])
})()
