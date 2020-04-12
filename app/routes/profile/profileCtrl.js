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
    template:
      '<h1 class="mt-md-5">Avatar</h1>' +
      '<hr />' +
      '<form>' +
      '  <div class="row row-no-margin" style="margin-bottom: 1em;">' +
      '    <div class="col-xs-4 col-sm-4 col-md-4 col-no-padding" ng-show="$ctrl.filepreview == null">' +
      '      <img ng-src="{{$ctrl.userDetails.avatar}}" alt="" style="height: 200px; width: 200px;" class="thumbnail img-responsive rounded mx-auto d-block" />' +
      '    </div>' +
      '    <div class="col-xs-4 col-sm-4 col-md-4 col-no-padding" ng-if="$ctrl.newAvatar === true">' +
      '      <h4 style="padding-top: 3.5em; padding-bottom: 1em; text-align: center;">change to <i class="fa fa-arrow-right"></i></h4>' +
      '    </div>' +
      '    <div class="col-xs-4 col-sm-4 col-md-4 col-no-padding" style="margin-bottom: 1em;" ng-if="$ctrl.newAvatar === true">' +
      '      <img alt="" id="newAvatar" style="height: 200px; width: 200px;" class="thumbnail img-responsive rounded mx-auto d-block" />' +
      '    </div>' +
      '  </div>' +
      '  <div class="custom-file" id="customFile" lang="es">' +
      '    <div class="col-md-12">' +
      '      <input type="file" class="custom-file-input" id="file" name="file" file-upload-on-change="$ctrl.addImage" />' +
      '      <label class="custom-file-label" for="exampleInputFile">Select image file...</label>' +
      '    </div>' +
      '  </div>' +
      '  <div class="row justify-content-center mt-md-3 mt-sm-3 mt-xs-3" ng-if="$ctrl.newAvatar === true">' +
      '    <button type="button" class="btn btn-warning mr-md-1 mr-sm-1 mr-xs-1" ng-click="$ctrl.cancelAvatarUpload()">Cancel Upload</button>' +
      '    <button type="button" class="btn btn-success" ng-click="$ctrl.handleAvatarUpload()">Upload Image</button>' +
      '  </div>' +
      '</form>' +
      '<h1 class="mt-md-5">Profile</h1>' +
      '<hr />' +
      '<form>' +
      '  <div class="form-group row">' +
      '    <label for="firstName" class="col-sm-2 col-form-label">First Name</label>' +
      '    <div class="col-sm-10">' +
      '      <input type="text" class="form-control" id="firstName" ng-model="$ctrl.userDetails.firstName" placeholder="First Name" />' +
      '    </div>' +
      '  </div>' +
      '  <div class="form-group row">' +
      '    <label for="lastName" class="col-sm-2 col-form-label">Last Name</label>' +
      '    <div class="col-sm-10">' +
      '      <input type="text" class="form-control" id="lastName" ng-model="$ctrl.userDetails.lastName" placeholder="Last Name" />' +
      '    </div>' +
      '  </div>' +
      '  <div class="form-group row">' +
      '    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>' +
      '    <div class="col-sm-10">' +
      '      <input type="text" readonly class="form-control-plaintext" ng-model="$ctrl.userDetails.email" id="staticEmail" />' +
      '    </div>' +
      '  </div>' +
      '  <div class="text-center">' +
      '    <button type="submit" class="btn btn-block send-button tx-tfm" ng-click="$ctrl.handleUserUpdate()">Update Profile' +
      '      <img ng-if="dataLoading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />' +
      '    </button>' +
      '  </div>' +
      '</form>' +
      '<div ng-if="$ctrl.success" id="message" style="position: relative; margin-top: 5em;">' +
      '  <div style="padding: 5px;">' +
      '    <div id="inner-message" class="alert alert-success">{{$ctrl.success}}</div>' +
      '  </div>' +
      '</div>' +
      '<div ng-show="$ctrl.error" id="message" style="position: relative; margin-top: 5em;">' +
      '  <div style="padding: 5px;">' +
      '    <span class="fa fa-danger"></span>' +
      '    <div id="inner-message" class="alert alert-danger">{{$ctrl.error}}</div>' +
      '  </div>' +
      '</div>',
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
