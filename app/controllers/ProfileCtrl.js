;(function () {
  angular.module('TodoApp').controller('ProfileCtrl', [
    '$scope',
    '$location',
    '$window',
    'AuthenticationService',
    function ($scope, $location, $window, AuthenticationService) {
      var path = $location.path()
      if (path === '/login' || path === '/register') {
        $scope.showNavbar = false
      } else {
        $scope.showNavbar = true
      }
      $scope.userDetails = {}

      $scope.handleLogout = function () {
        $window.localStorage.clear()
        $window.sessionStorage.clear()
        $location.path('/')
        $window.location.reload()
      }

      $scope.handleUserUpdate = function () {
        AuthenticationService.UpdateCurrentUsersDetails($scope.userDetails, function (response) {
          if (response.success) {
            getUserDetails()
          } else {
            // TODO: need to add better error handling below
            $scope.error = response.message
          }
        })
      }
      // $scope.$watch('file', function (newfile, oldfile) {})

      $scope.handleAvatarUpload = function () {
        AuthenticationService.changeUserAvatar($scope.filepreview, function (response) {
          if (response.success) {
            $scope.filepreview = undefined
            getUserDetails()
            $window.location.reload()
          } else {
            // TODO: need to add better error handling below
            $scope.error = response.message
          }
        })
      }

      $scope.cancelAvatarUpload = function () {
        $scope.filepreview = undefined
      }

      function getUserDetails() {
        AuthenticationService.getUserDetails(function (response) {
          if (response.success) {
            $scope.userDetails = response.data
          } else {
            // TODO: need to add better error handling below
            $scope.error = response.message
          }
        })
      }

      getUserDetails()
    }
  ])
})()
