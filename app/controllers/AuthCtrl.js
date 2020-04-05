;(function () {
  angular.module('TodoApp').controller('AuthCtrl', [
    '$scope',
    '$location',
    function ($scope, $location) {
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
        if ($scope.showLoginForm) {
          console.log('Handle User login')
          $scope.dataLoading = false
        } else {
          console.log('Handle User registration')
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
      }
    }
  ])
})()
