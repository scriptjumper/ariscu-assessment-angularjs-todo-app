;(function () {
  angular.module('TodoApp').factory('TodoTaskService', [
    '$http',
    '$cookieStore',
    '$rootScope',
    '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {
      var service = {}

      service.todoTasks = [
        {
          id: 1,
          title: 'Eating'
        },
        {
          id: 2,
          title: 'Code'
        },
        {
          id: 3,
          title: 'Sleep'
        },
        {
          id: 4,
          title: 'Repeat'
        }
      ]

      service.FetchAllTodoTasks = function () {}

      service.SaveTodoTask = function (data) {}

      service.UpdateTodoTask = function (data) {}

      service.DeleteTodoTask = function (data) {}

      return service
    }
  ])
})()
