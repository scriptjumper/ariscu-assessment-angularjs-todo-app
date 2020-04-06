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

      service.FetchAllTodoTasks = function () {
        /**
         * TODO:
         * Fetch all todo tasks for current user
         * store data in session storage
         */
      }

      service.SaveTodoTask = function (data) {}

      service.UpdateTodoTask = function (data) {}

      service.DeleteTodoTask = function (data) {}

      service.getById = function (id) {
        /**
         * TODO:
         * going to fetch todo tasks from session storage
         */
        var todoTask = {}

        service.todoTasks.forEach((todoTaskObj) => {
          if (todoTaskObj.id == id) {
            todoTask = todoTaskObj
            return
          }
        })

        return todoTask
      }

      return service
    }
  ])
})()
