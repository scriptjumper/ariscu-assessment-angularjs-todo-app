angular
  .module('app.profile', [])
  .directive('fileUploadOnChange', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeFunc = scope.$eval(attrs.fileUploadOnChange)
        element.bind('change', onChangeFunc)
      }
    }
  })
  .component('profile', {
    templateUrl: 'app/routes/profile/profile.html',
    controllerAs: '$ctrl',
    controller: [
      '$rootScope',
      '$window',
      'authenticationService',
      function ($rootScope, $window, authenticationService) {
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
         * $ctrl.addImage():
         *
         * Prepares image to be displayed in the view
         */
        $ctrl.addImage = function () {
          var f = document.getElementById('file').files[0],
            r = new FileReader()
          $ctrl.newAvatar = true
          $rootScope.$apply()
          r.onloadend = function (e) {
            $ctrl.dataimg = 'data:image/jpeg;base64,' + btoa(e.target.result)
            var img = document.getElementById('newAvatar')
            img.src = $ctrl.dataimg
          }
          r.readAsBinaryString(f)
        }

        /**
         * $ctrl.handleAvatarUpload():
         *
         * Gets a base64 encoded file from upload directive
         * base64 string is stored in `$ctrl.filepreview`
         *
         * Calling AuthenticationService.changeUserAvatar()
         * and passing $ctrl.filepreview
         *
         * on success response -> calls getUserDetails() to ensure data is up to date and reloads component
         *                        for avatar to be updated in the navbar and profile view
         *
         * on error response -> displays error message in view
         */
        $ctrl.handleAvatarUpload = function () {
          authenticationService.changeUserAvatar($ctrl.dataimg).then(
            function (res) {
              if (res.success) {
                delete $ctrl.dataimg
                delete $ctrl.error
                $ctrl.newAvatar = false
                getUserDetails()
                $window.location.reload()
              }
            },
            function (err) {
              $ctrl.error = err.message
            }
          )
        }

        /**
         * $ctrl.cancelAvatarUpload():
         *
         * Handles when the user clicks the cancel button on the upload directive
         *
         * Clears all file inputs and returning [input type=file] back to it's
         * original state.
         */
        $ctrl.cancelAvatarUpload = function () {
          delete $ctrl.filepreview
          delete $ctrl.file
          $ctrl.newAvatar = false
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
