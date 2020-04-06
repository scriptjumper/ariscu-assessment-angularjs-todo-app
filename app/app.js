;(function () {
  angular
    .module('TodoApp', ['ngRoute', 'ngCookies'])
    .config([
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
          .when('/register', {
            controller: 'AuthCtrl',
            templateUrl: 'views/auth.html'
          })
          .otherwise({ redirectTo: '/' })
      }
    ])
    .constant('baseUrl', 'http://localhost:8000/api')
})()
