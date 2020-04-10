;(function () {
  angular.module('TodoApp').factory('TodoTaskService', [
    '$http',
    'baseUrl',
    function ($http, baseUrl) {
      var service = {}

      service.FetchAllTodoTasks = function (callback) {
        var authentication = service.getAuthenticationHeaders(),
          res = {}

        var req = {
          method: 'GET',
          url: baseUrl + '/tasks',
          headers: {
            Authorization: `${authentication.token_type} ${authentication.access_token}`
          }
        }

        $http(req).then(
          function (response) {
            if (response.status === 200) {
              res.success = true
              res.data = response.data.data || []
            }

            sessionStorage.setItem('todoTasks', JSON.stringify(res.data))
            return callback(res)
          },
          function (response) {
            callback(response)
          }
        )
      }

      service.SaveTodoTask = function (data, callback) {
        var authentication = service.getAuthenticationHeaders(),
          res = {}

        var req = {
          method: 'POST',
          url: baseUrl + '/tasks',
          headers: {
            Authorization: `${authentication.token_type} ${authentication.access_token}`
          },
          data: { title: data.title, isComplete: false }
        }

        $http(req).then(
          function (response) {
            if (response.status === 201) {
              res.success = true
            }
            return callback(res)
          },
          function (response) {
            callback(response)
          }
        )
      }

      service.UpdateTodoTask = function (data, callback) {
        var authentication = service.getAuthenticationHeaders(),
          res = {}

        var req = {
          method: 'PUT',
          url: baseUrl + `/tasks/${data.id}`,
          headers: {
            Authorization: `${authentication.token_type} ${authentication.access_token}`
          },
          data: {
            title: data.title,
            isComplete: data.isComplete
          }
        }

        $http(req).then(
          function (response) {
            if (response.status === 200) {
              res.success = true
            }

            return callback(res)
          },
          function (response) {
            callback(response)
          }
        )
      }

      service.DeleteTodoTask = function (id, callback) {
        var authentication = service.getAuthenticationHeaders(),
          res = {}

        var req = {
          method: 'DELETE',
          url: baseUrl + `/tasks/${id}`,
          headers: {
            Authorization: `${authentication.token_type} ${authentication.access_token}`
          }
        }

        $http(req).then(
          function (response) {
            if (response.status === 204) {
              res.success = true
            }

            return callback(res)
          },
          function (response) {
            callback(response)
          }
        )
      }

      service.getTodoTaskById = function (id) {
        var todoTasks = JSON.parse(sessionStorage.getItem('todoTasks')) || [],
          todoTask = {}

        todoTasks.forEach((todoTaskObj) => {
          if (todoTaskObj.id == id) {
            todoTask = todoTaskObj
            return
          }
        })

        return todoTask
      }

      service.getAuthenticationHeaders = function () {
        // get users authentication from localstorage
        var authentication = JSON.parse(localStorage.getItem('isAuthenticated'))

        return authentication
      }

      return service
    }
  ])
})()
