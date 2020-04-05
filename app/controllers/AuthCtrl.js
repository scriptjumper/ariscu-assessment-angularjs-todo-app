;(function () {
  angular.module('TodoApp').controller('AuthCtrl', [
    '$scope',
    '$location',
    function ($scope, $location) {
      constructor()

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

      function constructor() {
        // check path to see which form to display
        $scope.showLoginForm = true
        $scope.formMessage = "Are you new? why don't you create an account "
        $scope.formLink = '/register'
        $scope.formBtnName = 'Login'
        var path = $location.path()
        if (path === '/register') {
          $scope.showLoginForm = false
          $scope.formMessage = 'Already have an account? just login '
          $scope.formLink = '/login'
          $scope.formBtnName = 'Register'
        }
      }
    }
  ])
})()
