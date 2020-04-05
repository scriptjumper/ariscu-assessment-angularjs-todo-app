;(function () {
  angular.module('TodoApp', ['ngRoute', 'ngCookies']).config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          controller: 'TaskCtrl',
          templateUrl: 'views/tasks.html'
        })
        .when('/login', {
          controller: 'AuthCtrl',
          templateUrl: 'views/auth.html'
        })
        .otherwise({ redirectTo: '/' })

      //
      $locationProvider.hashPrefix('')
      $locationProvider.html5Mode(true)
    }
  ])
})()