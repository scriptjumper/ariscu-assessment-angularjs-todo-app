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
      $scope.taskDetails = {}

      $scope.handleTaskSave = function () {
        console.log('handleTaskSave() method was clicked.')
      }

      $scope.handleTaskDeletion = function () {
        console.log('handleTaskDeletion() method was clicked.')
      }
    }
  ])
})()
