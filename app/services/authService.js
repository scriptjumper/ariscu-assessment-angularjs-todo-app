;(function () {
  angular.module('TodoApp').factory('AuthenticationService', [
    '$http',
    '$cookieStore',
    '$rootScope',
    '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {
      var service = {}

      // temp function
      function getRandomItem(arr) {
        let items = arr
        let randomitem = Math.floor(Math.random() * items.length)
        return items[randomitem]
      }

      service.Login = function (email, password, callback) {
        // simulating a dummy server request
        $timeout(function () {
          var response = { success: email === 'testuser@tdd.com' && password === 'test' }
          if (!response.success) {
            response.message = 'Login failed, please check your username and password!'
          }
          callback(response)
        }, 1000)
      }

      service.Register = function (firstName, lastName, email, password, callback) {
        // simulating a dummy server request
        $timeout(function () {
          var response = { success: getRandomItem([true, false]) }
          if (!response.success) {
            response.message = 'Failed to create user!'
          }
          callback(response)
        }, 1000)
      }

      return service
    }
  ])
})()
