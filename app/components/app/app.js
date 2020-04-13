;(function () {
  angular
    .module('TodoApp', ['ngComponentRouter', 'ngRoute', 'app.navbar', 'app.login', 'app.register', 'app.profile', 'app.tasks', 'app.404'])
    .value('$routerRootComponent', 'app')
    .component('app', {
      template: '<nav-bar></nav-bar><main class="container"><ng-outlet></ng-outlet></main>',
      $routeConfig: [
        { path: '/', component: 'tasks', name: 'Tasks' },
        { path: '/tasks/...', component: 'tasks', name: 'Tasks' },
        { path: '/profile', component: 'profile', name: 'Profile' },
        { path: '/login', component: 'login', name: 'Login' },
        { path: '/register', component: 'register', name: 'Register' },
        { path: '/**', component: 'notfound', name: 'NotFound' }
      ]
    })
    .run([
      '$rootScope',
      '$location',
      function ($rootScope, $location) {
        $rootScope.backendUrl = 'http://localhost:8000/api'

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
          /**
           * ! For production - make use of a authenticate method in the backend
           *
           * Checking the path a user is allowed to go to based their authentication
           * should a user got to a route that's not defined the will get a 404 page
           * with a button to root the to the home page ("/")
           */
          var path = $location.path()
          var userIsAuthenticated = localStorage.getItem('isAuthenticated') || false

          switch (path) {
            case '/':
              if (!userIsAuthenticated) {
                $location.path(['/login'])
              } else if (userIsAuthenticated) {
                $location.path(['/tasks'])
              }
              break
            case '/tasks':
              if (!userIsAuthenticated) {
                $location.path(['/login'])
              }
              break
            case '/tasks/new':
              if (!userIsAuthenticated) {
                $location.path(['/login'])
              }
              break
            case '/profile':
              if (!userIsAuthenticated) {
                $location.path(['/login'])
              }
              break
            case '/login':
              if (userIsAuthenticated) {
                $location.path(['/tasks'])
              }
              break
            case '/register':
              if (userIsAuthenticated) {
                $location.path(['/tasks'])
              }
              break
            default:
              break
          }
        })
      }
    ])
})()
