angular.module('app.register', []).component('register', {
  templateUrl: 'app/routes/register/register.html',
  controllerAs: '$ctrl',
  controller: [
    '$location',
    'authenticationService',
    function ($location, authenticationService) {
      var $ctrl = this

      // initializing the authentication form object
      $ctrl.registerFormDetails = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }

      /**
       * isUserAuthenticated(response):
       *
       * Takes response from both authenticationService.Login() and authenticationService.Register()
       * handles both success and error cases
       *
       * If success
       *      call authenticationService.SetCredentials() -> which sets response data to localStorage
       * else
       *      sets error message that will be displayed in the view
       *      and loading animation to false which stops loading bar from being displayed
       */
      function isUserAuthenticated(response) {
        if (response.success) {
          authenticationService.SetCredentials(response.data)
          // $rootRouter.navigate(['/Tasks'])
          $location.path(['/tasks'])
          // $window.location.reload()
          delete $ctrl.error
        } else {
          $ctrl.error = response.message || response.error
          $ctrl.dataLoading = false
        }
      }

      /**
       * $ctrl.handleRegistration():
       * Call authenticationService.Register()
       * passing `$ctrl.registerFormDetails`
       *
       * Sevice will return an error or success response
       */
      $ctrl.handleRegistration = function () {
        $ctrl.dataLoading = true
        authenticationService.Register($ctrl.registerFormDetails).then(
          function (res) {
            isUserAuthenticated(res)
          },
          function (res) {
            isUserAuthenticated(res)
          }
        )
      }
    }
  ]
})
