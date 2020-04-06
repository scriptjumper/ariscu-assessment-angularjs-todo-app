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
          .when('/profile', {
            controller: 'ProfileCtrl',
            templateUrl: 'views/userProfile.html'
          })
          .otherwise({ redirectTo: '/' })
      }
    ])
    .run([
      '$rootScope',
      '$location',
      '$cookieStore',
      '$http',
      function ($rootScope, $location, $cookieStore, $http) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
          /**
           * ! For production
           * make use of a authenticate method in the backend
           */
          var path = $location.path()
          var userIsAuthenticated = localStorage.getItem('isAuthenticated') || false

          switch (path) {
            case '/':
              if (!userIsAuthenticated) {
                $location.path('/login')
              }
              break
            case '/tasks/new':
              if (!userIsAuthenticated) {
                $location.path('/login')
              }
              break
            case '/profile':
              if (!userIsAuthenticated) {
                $location.path('/login')
              }
              break
            case '/login':
              if (userIsAuthenticated) {
                $location.path('/')
              }
              break
            case '/register':
              if (userIsAuthenticated) {
                $location.path('/')
              }
              break
            default:
              break
          }
        })
      }
    ])
    .constant('baseUrl', 'http://localhost:8000/api')
})()
