angular.module('app.profile', []).component('profile', {
  templateUrl: 'app/routes/profile/profile.html',
  controllerAs: '$ctrl',
  controller: [
    'authenticationService',
    function (authenticationService) {
      var $ctrl = this

      // Doing pre controller setup
      $ctrl.init = function () {
        // initialising users object for profile view
        $ctrl.userDetails = {}

        getUserDetails()
      }

      /**
       * $ctrl.handleUserUpdate():
       *
       * Calls authenticationService.UpdateCurrentUsersDetails()
       * passes user object
       *
       * on success response -> calls getUserDetails() to ensure data is up to date
       * on error response -> displays error message in view
       */
      $ctrl.handleUserUpdate = function () {
        authenticationService.UpdateCurrentUsersDetails($ctrl.userDetails).then(
          function (res) {
            if (res.success) {
              $ctrl.success = res.message
              getUserDetails()
            }
          },
          function (err) {
            $ctrl.error = err.message
          }
        )

        // removing alert message after 5 seconds
        setTimeout(() => {
          delete $ctrl.success
          delete $ctrl.error
        }, 5000)
      }

      /**
       * getUserDetails():
       *  Gets information about the user currently logged in.
       *  Binds response to `$ctrl.userDetails`
       *
       * Should app not get any information about the current user
       * user will be logged out
       */
      function getUserDetails() {
        authenticationService.getUserDetails().then(
          function (res) {
            $ctrl.userDetails = res.data
          },
          function () {
            $ctrl.handleLogout()
          }
        )
      }

      // calling `$ctrl.init()` function to setup controller config
      $ctrl.init()
    }
  ]
})
