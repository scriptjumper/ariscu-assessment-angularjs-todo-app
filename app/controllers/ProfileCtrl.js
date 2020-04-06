;(function () {
  angular.module('TodoApp').controller('ProfileCtrl', [
    '$scope',
    '$location',
    function ($scope, $location) {
      var path = $location.path()
      if (path === '/login' || path === '/register') {
        $scope.showNavbar = false
      } else {
        $scope.showNavbar = true
      }

      $scope.handleLogout = function () {
        console.log('handleLogout() was clicked..')
      }
    }
  ])
})()
