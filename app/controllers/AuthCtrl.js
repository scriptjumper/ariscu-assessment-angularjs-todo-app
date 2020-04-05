;(function () {
  angular.module('TodoApp').controller('AuthCtrl', [
    '$scope',
    function ($scope) {
      constructor()

      $scope.submitForm = function () {
        console.log(`${$scope.email} ${$scope.password}`)
      }

      function constructor() {
        // any presets/checks goes here
      }
    }
  ])
})()
