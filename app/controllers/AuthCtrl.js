;(function () {
  angular.module('TodoApp').controller('AuthCtrl', [
    '$scope',
    '$location',
    '$window',
    'authenticationService',
    function ($scope, $location, $window, authenticationService) {
      // Doing pre controller setup
      $scope.init = function () {
        /**
         * Using $location.path() to setup the authentication form
         * based on the route the app is currently at.
         *
         * Setting $scope.showRegisterFields = true will show the login form
         * and doing the opposite will result in show the register form
         */
        $scope.showRegisterFields = false
        $scope.formDetails = loginFormDetails
        var path = $location.path()
        if (path === '/register') {
          $scope.showRegisterFields = true
          $scope.formDetails = registerFormDetails
        }

        // initializing the authentication form object
        $scope.userFormDetails = {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }
      }

      /**
       * Based on the app path we have a template for the authentication form
       *
       * path = '/login'  -> $scope.formDetails = loginFormDetails
       * path = '/register' -> $scope.formDetails = registerFormDetails
       */
      var loginFormDetails = {
          formMessage: "Are you new? why don't you create an account ",
          formLink: '#/register',
          formBtnName: 'Login'
        },
        registerFormDetails = {
          formMessage: 'Already have an account? just login ',
          formLink: '#/login',
          formBtnName: 'Register'
        }

      /**
       * isUserAuthenticated(response):
       *
       * Takes response from both authenticationService.Login() and authenticationService.Register()
       * handles both success and error cases
       *
       * If success
       *      call authenticationService.SetCredentials() -> which sets response data to localStorage
       * else
       *      sets error message that will be displayed in the view
       *      and loading animation to false which stops loading bar from being displayed
       */
      function isUserAuthenticated(response) {
        if (response.success) {
          authenticationService.SetCredentials(response.data)
          $location.path('/')
          $window.location.reload()
          delete $scope.error
        } else {
          $scope.error = response.message
          $scope.dataLoading = false
        }
      }

      /**
       * $scope.handleSubmit():
       * In the $scope.init() $scope.showRegisterFields is set to true || false
       * based on that value `$scope.handleSubmit()` handles the service to call
       *
       * $scope.showRegisterFields -> false
       *      Call authenticationService.Login() service
       * $scope.showRegisterFields -> true
       *      Call authenticationService.Register() service
       *
       * both services is passed `$scope.userFormDetails`
       */
      $scope.handleSubmit = function () {
        $scope.dataLoading = true
        if (!$scope.showRegisterFields) {
          authenticationService.Login($scope.userFormDetails).then(
            function (res) {
              isUserAuthenticated(res)
            },
            function (res) {
              isUserAuthenticated(res)
            }
          )
        } else {
          authenticationService.Register($scope.userFormDetails).then(
            function (res) {
              isUserAuthenticated(res)
            },
            function (res) {
              isUserAuthenticated(res)
            }
          )
        }
      }

      // calling `$scope.init()` function to setup controller config
      $scope.init()
    }
  ])
})()
