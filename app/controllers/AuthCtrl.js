;(function () {
  angular.module('TodoApp').controller('AuthCtrl', [
    '$scope',
    '$location',
    'AuthenticationService',
    function ($scope, $location, AuthenticationService) {
      // templating the text to display for both the login and register form
      var loginFormDetails = {
          formMessage: "Are you new? why don't you create an account ",
          formLink: '/register',
          formBtnName: 'Login'
        },
        registerFormDetails = {
          formMessage: 'Already have an account? just login ',
          formLink: '/login',
          formBtnName: 'Register'
        }

      $scope.submit = function () {
        $scope.dataLoading = true
        if (!$scope.showRegisterFields) {
          AuthenticationService.Login($scope.userFormDetails, function (response) {
            if (response.success) {
              $location.path('/')
            } else {
              $scope.error = response.message
              $scope.dataLoading = false
            }
          })
        } else {
          // handle register
          $scope.dataLoading = false
        }
      }

      constructor()

      function constructor() {
        // check path to see which form to display
        $scope.showRegisterFields = false
        $scope.formDetails = loginFormDetails
        var path = $location.path()
        if (path === '/register') {
          $scope.showRegisterFields = true
          $scope.formDetails = registerFormDetails
        }
        $scope.userFormDetails = {}
      }
    }
  ])
})()
