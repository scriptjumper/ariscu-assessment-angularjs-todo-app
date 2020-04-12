angular.module('app.navbar', []).component('navBar', {
  template:
    '<nav ng-if="$ctrl.Auth.loggedIn" class="navbar navbar-expand-lg navbar-light bg-light">' +
    '    <div class="navbar-brand">' +
    '      <img ng-src="{{$ctrl.userDetails.avatar}}" alt="My Avatar" style="height: 2em; width: 2em;" />' +
    '    </div>' +
    '    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" >' +
    '      <span class="navbar-toggler-icon"></span>' +
    '    </button>' +
    '    <div class="collapse navbar-collapse" id="navbarNavDropdown">' +
    '      <ul class="navbar-nav mr-auto">' +
    '        <li>{{$ctrl.userDetails.firstName}}</li>' +
    '      </ul>' +
    '      <ul class="navbar-nav">' +
    `        <li><a class="nav-link" ng-link="['/Tasks']">My Todos</a></li>` +
    '        <li class="nav-item dropdown">' +
    '          <a style="cursor: pointer;" class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >Settings</a>' +
    '          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">' +
    `            <a class="dropdown-item" ng-link="['/Profile']">Profile</a>` +
    '            <a class="dropdown-item" ng-click="$ctrl.handleLogout()">Logout</a>' +
    '          </div>' +
    '        </li>' +
    '      </ul>' +
    '    </div>' +
    '</nav>',
  controllerAs: '$ctrl',
  controller: [
    '$location',
    'authenticationService',
    function ($location, authenticationService) {
      var $ctrl = this

      // Doing pre controller setup
      $ctrl.init = function () {
        var path = $location.path()
        if (path !== '/login' || path !== '/register') {
          $ctrl.Auth = authenticationService
          getUserDetails()
        }
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

      /**
       * $ctrl.handleLogout():
       *
       * Once the user clicks the logout button/link text
       * we call authenticationService.Logout() -> handle the items we set in local/session storage
       *
       * then route the user to the login page
       * * (Once routed to the login view user can only switch between the login and register views)
       */
      $ctrl.handleLogout = function () {
        authenticationService.Logout()
        $location.path(['/login'])
      }

      // calling `$ctrl.init()` function to setup controller config
      $ctrl.init()
    }
  ]
})
