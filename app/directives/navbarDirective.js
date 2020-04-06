;(function () {
  angular.module('TodoApp').directive('navbar', function () {
    return {
      restrict: 'E',
      controller: 'ProfileCtrl',
      templateUrl: 'views/shared/navbar.html'
    }
  })
})()
