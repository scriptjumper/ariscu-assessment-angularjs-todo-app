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

      service.Register = function (data, callback) {}

      return service
    }
  ])
})()
