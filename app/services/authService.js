;(function () {
  angular.module('TodoApp').factory('AuthenticationService', [
    '$http',
    '$cookieStore',
    '$rootScope',
    '$timeout',
    'baseUrl',
    'TodoTaskService',
    function ($http, $cookieStore, $rootScope, $timeout, baseUrl, TodoTaskService) {
      var service = {}

      service.Login = function (data, callback) {
        var res = {}
        var onSuccess = function (response, status, headers, config) {
          if (status === 200) {
            res.success = true
            res.data = response
          }
          return callback(res)
        }

        var onError = function (response, status, headers, config) {
          if (status === 401) {
            res.message = response.error
          } else {
            res.error = 'Unable to find user, Please check if your email and password is entered correctly.'
          }

          return callback(res)
        }

        $http
          .post(baseUrl + '/login', { email: data.email, password: data.password })
          .success(onSuccess)
          .error(onError)
      }

      service.Register = function (data, callback) {
        var res = {}
        var onSuccess = function (response, status, headers, config) {
          if (status === 200) {
            res.success = true
            res.message = 'User created successfully, please login.'
          }
          return callback(res)
        }

        var onError = function (response, status, headers, config) {
          if (status === 401) {
            res.message = response.error
          } else {
            res.error = 'Unable to find user, Please check if your email and password is entered correctly.'
          }

          return callback(res)
        }

        $http
          .post(baseUrl + '/register', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
          })
          .success(onSuccess)
          .error(onError)
      }

      service.getUserDetails = function (callback) {
        var authentication = TodoTaskService.getAuthenticationHeaders(),
          res = {}

        var req = {
          method: 'GET',
          url: baseUrl + '/user',
          headers: {
            Authorization: `${authentication.token_type} ${authentication.access_token}`
          }
        }

        $http(req).then(
          function (response) {
            if (response.status === 200) {
              res.success = true
              res.data = response.data || []

              localStorage.setItem('currentUser', JSON.stringify(res.data))
            }

            return callback(res)
          },
          function (response) {
            // TODO: need to add better error handling below
            callback(response)
          }
        )
      }

      service.SetCredentials = function (authdata) {
        localStorage.setItem('isAuthenticated', JSON.stringify(authdata))
      }

      return service
    }
  ])
})()
