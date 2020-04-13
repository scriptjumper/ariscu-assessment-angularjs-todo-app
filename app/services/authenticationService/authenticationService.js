;(function () {
  angular.module('TodoApp').factory('authenticationService', [
    '$http',
    '$q',
    '$rootScope',
    '$window',
    function ($http, $q, $rootScope, $window) {
      var authenticationService = this

      authenticationService.loggedIn = false

      /**
       * authenticationService.Login():
       * Gets a JWT token from the details passed in `user`
       *
       * Checks status and formats response sent to controller
       */
      authenticationService.Login = function (user) {
        var defer = $q.defer(),
          res = {}

        $http.post($rootScope.backendUrl + '/login', user).then(
          function (response) {
            if (response.status === 200) {
              res.success = true
              res.data = response.data
              authenticationService.loggedIn = true
            }

            defer.resolve(res)
          },
          function (err) {
            if (err.status === 401) {
              res.message = err.message
            } else {
              res.message = 'Unable to find user, Please check if your email and password is entered correctly.'
            }

            defer.reject(res)
          }
        )

        return defer.promise
      }

      /**
       * authenticationService.Register():
       * Create a JWT token from the details passed in `user`
       *
       * Checks status and formats response sent to controller
       *
       * .error():
       *    Handling and formatting errors using switch statement
       *    for errors thrown by the database
       */
      authenticationService.Register = function (user) {
        var defer = $q.defer(),
          res = {}

        $http.post($rootScope.backendUrl + '/register', user).then(
          function (response) {
            if (response.status === 200) {
              res.success = true
              res.data = response.data
              authenticationService.loggedIn = true
            }

            defer.resolve(res)
          },
          function (err) {
            // checking status and formatting error message to be displayed
            switch (err.status) {
              case 401:
                res.message = err.message
                break
              case 500:
                if (err.message.includes('duplicate key value violates unique constraint'))
                  res.message = 'Oops, Email enter is already in use by another account.'
                else res.message = 'Server seems to be offline'
                break

              default:
                break
            }

            defer.reject(res)
          }
        )

        return defer.promise
      }

      /**
       * authenticationService.getUserDetails():
       * Uses JWT to get current users details.
       *
       * Checks status and formats response sent to controller
       */
      authenticationService.getUserDetails = function () {
        var defer = $q.defer(),
          res = {},
          authentication = authenticationService.getAuthenticationHeaders()

        $http
          .get($rootScope.backendUrl + '/user', {
            headers: {
              Authorization: `${authentication.token_type} ${authentication.access_token}`
            }
          })
          .then(
            function (response) {
              if (response.status === 200) {
                res.success = true
                res.data = response.data || []

                localStorage.setItem('currentUser', JSON.stringify(res.data))
              }

              defer.resolve(res)
            },
            function (err) {
              defer.reject(err)
            }
          )

        return defer.promise
      }

      /**
       * authenticationService.UpdateCurrentUsersDetails():
       *
       * Takes user object
       * Updates users details in the database
       */
      authenticationService.UpdateCurrentUsersDetails = function (user) {
        var defer = $q.defer(),
          res = {},
          authentication = authenticationService.getAuthenticationHeaders()

        $http
          .put($rootScope.backendUrl + '/user/update', user, {
            headers: {
              Authorization: `${authentication.token_type} ${authentication.access_token}`
            }
          })
          .then(
            function (response) {
              if (response.status === 200) {
                res.success = true
                res.message = response.data.message
              }

              defer.resolve(res)
            },
            function (err) {
              defer.reject(err)
            }
          )

        return defer.promise
      }

      authenticationService.changeUserAvatar = function (avatar) {
        var defer = $q.defer(),
          res = {},
          authentication = authenticationService.getAuthenticationHeaders(),
          user = JSON.parse(localStorage.getItem('currentUser'))

        $http
          .post(
            $rootScope.backendUrl + '/user/avatar/new',
            {
              id: user.id,
              avatar: avatar
            },
            {
              headers: {
                Authorization: `${authentication.token_type} ${authentication.access_token}`
              }
            }
          )
          .then(
            function (response) {
              if (response.status === 200) {
                res.success = true
              }

              defer.resolve(res)
            },
            function (err) {
              defer.reject(err)
            }
          )

        return defer.promise
      }

      /**
       * authenticationService.Logout():
       * clear all items set in localStorage and sessionStorage
       */
      authenticationService.Logout = function () {
        $window.localStorage.clear()
        $window.sessionStorage.clear()
        authenticationService.loggedIn = false
      }

      /**
       * authenticationService.SetCredentials():
       *
       * Takes in the response recieved from the request
       * and sets JWT details to local storage
       */
      authenticationService.SetCredentials = function (authdata) {
        localStorage.setItem('isAuthenticated', JSON.stringify(authdata))
      }

      /**
       * authenticationService.getAuthenticationHeaders():
       *
       * Gets JWT from localStorage and return a json object
       */
      authenticationService.getAuthenticationHeaders = function () {
        return JSON.parse(localStorage.getItem('isAuthenticated'))
      }

      /**
       * Checking if user has a JWT token
       */
      var isAuthenticated = authenticationService.getAuthenticationHeaders() || undefined
      if (isAuthenticated) authenticationService.loggedIn = true

      return authenticationService
    }
  ])
})()
