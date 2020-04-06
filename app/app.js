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
            templateUrl: 'views/todoTasks.html'
          })
          .when('/login', {
            controller: 'AuthCtrl',
            templateUrl: 'views/auth.html'
          })
          .when('/register', {
            controller: 'AuthCtrl',
            templateUrl: 'views/auth.html'
          })
          .when('/tasks/new', {
            controller: 'TaskCtrl',
            templateUrl: 'views/shared/todoTaskForm.html'
          })
          .when('/tasks/edit/:id', {
            controller: 'TaskCtrl',
            templateUrl: 'views/shared/todoTaskForm.html'
          })
          .otherwise({ redirectTo: '/' })
      }
    ])
    .constant('baseUrl', 'http://localhost:8000/api')
})()
