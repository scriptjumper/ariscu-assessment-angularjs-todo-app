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
            $scope.success = response.message
            getUserDetails()
            setTimeout(() => {
              delete $scope.success
              $scope.$apply()
            }, 3000)
          } else {
            $scope.error = response.message
          }
        })
      }

      $scope.handleAvatarUpload = function () {
        AuthenticationService.changeUserAvatar($scope.filepreview, function (response) {
          if (response.success) {
            $scope.filepreview = undefined
            getUserDetails()
            $window.location.reload()
          } else {
            $scope.error = response.message
          }
        })
      }

      $scope.cancelAvatarUpload = function () {
        delete $scope.filepreview
        delete $scope.file
      }

      function getUserDetails() {
        AuthenticationService.getUserDetails(function (response) {
          if (response.success) {
            $scope.userDetails = response.data
          } else {
            $scope.error = response.message
          }
        })
      }

      getUserDetails()
    }
  ])
})()
