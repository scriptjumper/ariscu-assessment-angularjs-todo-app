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
        var onSuccess = function (response, status, headers, config) {
          console.log(response)
        }

        var onError = function (response, status, headers, config) {
          console.log(response)
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
