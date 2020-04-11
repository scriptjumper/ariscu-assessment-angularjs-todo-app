;(function () {
  angular.module('TodoApp').controller('ProfileCtrl', [
    '$scope',
    '$location',
    '$window',
    'authenticationService',
    function ($scope, $location, $window, authenticationService) {
      // Doing pre controller setup
      $scope.init = function () {
        /**
         * Checking app path
         * - hiding navbar from both login and register views/routes
         */
        var path = $location.path()
        if (path === '/login' || path === '/register') {
          $scope.showNavbar = false
        } else {
          $scope.showNavbar = true
        }

        // initialising users object for profile view
        $scope.userDetails = {}

        getUserDetails()
      }

      /**
       * $scope.handleLogout():
       *
       * Once the user clicks the logout button/link text
       * we clear all items set in localStorage and sessionStorage
       *
       * then route the user to the login page
       * * (Once routed to the login view user can only switch between the login and register views)
       */
      $scope.handleLogout = function () {
        $window.localStorage.clear()
        $window.sessionStorage.clear()
        $location.path('/')
        $window.location.reload()
      }

      /**
       * $scope.handleUserUpdate():
       *
       * Calls authenticationService.UpdateCurrentUsersDetails()
       * passes user object
       *
       * on success response -> calls getUserDetails() to ensure data is up to date
       * on error response -> displays error message in view
       */
      $scope.handleUserUpdate = function () {
        authenticationService.UpdateCurrentUsersDetails($scope.userDetails).then(
          function (res) {
            if (res.success) {
              $scope.success = res.message
              getUserDetails()
            }
          },
          function (err) {
            $scope.error = err.message
          }
        )

        // removing alert message after 5 seconds
        setTimeout(() => {
          delete $scope.success
          delete $scope.error
          $scope.$apply()
        }, 5000)
      }

      /**
       * $scope.handleAvatarUpload():
       *
       * Gets a base64 encoded file from upload directive
       * base64 string is stored in `$scope.filepreview`
       *
       * Calling AuthenticationService.changeUserAvatar()
       * and passing $scope.filepreview
       *
       * on success response -> calls getUserDetails() to ensure data is up to date and reloads component
       *                        for avatar to be updated in the navbar and profile view
       *
       * on error response -> displays error message in view
       */
      $scope.handleAvatarUpload = function () {
        authenticationService.changeUserAvatar($scope.filepreview).then(
          function (res) {
            if (res.success) {
              delete $scope.filepreview
              delete $scope.error
              getUserDetails()
              $window.location.reload()
            }
          },
          function (err) {
            $scope.error = err.message
          }
        )
      }

      /**
       * $scope.cancelAvatarUpload():
       *
       * Handles when the user clicks the cancel button on the upload directive
       *
       * Clears all file inputs and returning [input type=file] back to it's
       * original state.
       */
      $scope.cancelAvatarUpload = function () {
        delete $scope.filepreview
        delete $scope.file
      }

      /**
       * getUserDetails():
       *  Gets information about the user currently logged in.
       *  Binds response to `$scope.userDetails`
       *
       * Should app not get any information about the current user
       * user will be logged out
       */
      function getUserDetails() {
        authenticationService.getUserDetails().then(
          function (res) {
            $scope.userDetails = res.data
          },
          function () {
            $scope.handleLogout()
          }
        )
      }

      // calling `$scope.init()` function to setup controller config
      $scope.init()
    }
  ])
})()
