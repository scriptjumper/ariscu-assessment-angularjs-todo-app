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
          .otherwise({ redirectTo: '/login' })

        // removing #! from url
        $locationProvider.hashPrefix('')
        $locationProvider.html5Mode(true)
      }
    ])
    .run([
      '$rootScope',
      '$location',
      '$cookieStore',
      '$http',
      function ($rootScope, $location, $cookieStore, $http) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // TODO: need to fix below
          var path = $location.path()
          var isAuthenticated = localStorage.getItem('isAuthenticated')
          // redirect to login page if not logged in
          if (path !== '/login' || path !== '/register') {
            if (isAuthenticated && path === '/') {
              $location.path('/tasks')
            } else if (isAuthenticated) {
              $location.path(path)
            } else {
              $location.path('/login')
            }
          } else if (path === '/login' || path === '/register') {
            if (!isAuthenticated) {
              $location.path(path)
            }
          } else if (path !== '/login' || path !== '/register') {
            if (!isAuthenticated) {
              $location.path('/login')
            }
          }
        })
      }
    ])
})()
