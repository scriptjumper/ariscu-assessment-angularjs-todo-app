angular.module('app.login', []).component('login', {
  templateUrl: 'app/routes/login/login.html',
  controllerAs: '$ctrl',
  controller: [
    '$location',
    '$window',
    'authenticationService',
    function ($location, $window, authenticationService) {
      var $ctrl = this

      // initializing the authentication form object
      $ctrl.loginFormDetails = {
        email: '',
        password: ''
      }

      /**
       * $ctrl.handleLogin():
       * Call authenticationService.Login()
       * passing `$ctrl.loginFormDetails`
       *
       * Sevice will return an error or success response
       */
      $ctrl.handleLogin = function () {
        $ctrl.dataLoading = true
        authenticationService.Login($ctrl.loginFormDetails).then(
          function (res) {
            authenticationService.SetCredentials(res.data)
            $location.path(['/tasks'])
            delete $ctrl.error
            $window.location.reload()
          },
          function (res) {
            $ctrl.error = res.message || res.error
            $ctrl.dataLoading = false
          }
        )
      }
    }
  ]
})
