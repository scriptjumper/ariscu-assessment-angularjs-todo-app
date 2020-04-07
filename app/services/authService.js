;(function () {
  angular.module('TodoApp').factory('AuthenticationService', [
    '$http',
    '$cookieStore',
    '$rootScope',
    '$timeout',
    'baseUrl',
    function ($http, $cookieStore, $rootScope, $timeout, baseUrl) {
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
            res.data = response
          }
          return callback(res)
        }

        var onError = function (response, status, headers, config) {
          switch (status) {
            case 401:
              res.message = response.message
              break
            case 500:
              if (response.message.includes('duplicate key value violates unique constraint'))
                res.message = 'Oops, Email enter is already in use by another account.'
              else res.message = 'Server seems to be offline'
              break

            default:
              break
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
        var authentication = service.getAuthenticationHeaders(),
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
            callback(response)
          }
        )
      }

      service.UpdateCurrentUsersDetails = function (data, callback) {
        var authentication = service.getAuthenticationHeaders(),
          res = {}

        var req = {
          method: 'PUT',
          url: baseUrl + '/user/update',
          headers: {
            Authorization: `${authentication.token_type} ${authentication.access_token}`
          },
          data: {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName
          }
        }

        $http(req).then(
          function (response) {
            if (response.status === 200) {
              res.success = true
            }

            return callback(res)
          },
          function (response) {
            callback(response)
          }
        )
      }

      service.changeUserAvatar = function (data, callback) {
        var authentication = service.getAuthenticationHeaders(),
          user = JSON.parse(localStorage.getItem('currentUser'))
        res = {}

        var req = {
          method: 'POST',
          url: baseUrl + '/user/avatar/new',
          headers: {
            Authorization: `${authentication.token_type} ${authentication.access_token}`
          },
          data: {
            id: user.id,
            avatar: data
          }
        }

        $http(req).then(
          function (response) {
            if (response.status === 200) {
              res.success = true
            }

            return callback(res)
          },
          function (response) {
            callback(response)
          }
        )
      }

      service.SetCredentials = function (authdata) {
        localStorage.setItem('isAuthenticated', JSON.stringify(authdata))
      }

      service.getAuthenticationHeaders = function () {
        // get users authentication from localstorage
        var authentication = JSON.parse(localStorage.getItem('isAuthenticated'))

        return authentication
      }

      return service
    }
  ])
})()
