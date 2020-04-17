;(function () {
  angular.module('TodoApp').factory('taskService', [
    '$http',
    '$q',
    '$rootScope',
    'authenticationService',
    function ($http, $q, $rootScope, authenticationService) {
      var taskService = this

      /**
       * taskService.SaveTodoTask():
       *
       * Creates new task for current user.
       */
      taskService.SaveTodoTask = function (task) {
        var authentication = authenticationService.getAuthenticationHeaders(),
          res = {},
          defer = $q.defer()

        $http
          .post($rootScope.backendUrl + '/tasks', task, {
            headers: {
              Authorization: `${authentication.token_type} ${authentication.access_token}`
            }
          })
          .then(
            function (response) {
              if (response.status === 201) {
                res.success = true
              }

              defer.resolve(res)
            },
            function (err) {
              defer.reject(err)
            }
          )

        return defer.promise
      }

      /**
       * taskService.UpdateTodoTask():
       *
       * Takes `task` param with details about existing task
       *
       * perform a put method that will update the to do task in the database
       *
       * * also used when user marks task as complete or incomplete
       */
      taskService.UpdateTodoTask = function (task) {
        var authentication = authenticationService.getAuthenticationHeaders(),
          res = {},
          defer = $q.defer()

        $http
          .put($rootScope.backendUrl + `/tasks/${task.id}`, task, {
            headers: {
              Authorization: `${authentication.token_type} ${authentication.access_token}`
            }
          })
          .then(
            function (response) {
              if (response.status === 200) {
                res.success = true
              }

              defer.resolve(res)
            },
            function (err) {
              if (err.message.includes('No query results for model')) res.message = 'Oops, failed to update task.'

              defer.reject(res)
            }
          )

        return defer.promise
      }

      /**
       * taskService.DeleteTodoTask():
       *
       * Takes param taskId int
       *  - removes task with the same taskId from database
       */
      taskService.DeleteTodoTask = function (taskId) {
        var authentication = authenticationService.getAuthenticationHeaders(),
          res = {},
          defer = $q.defer()

        $http
          .delete($rootScope.backendUrl + `/tasks/${taskId}`, {
            headers: {
              Authorization: `${authentication.token_type} ${authentication.access_token}`
            }
          })
          .then(
            function (response) {
              if (response.status === 204) {
                res.success = true
              }

              defer.resolve(res)
            },
            function (err) {
              defer.reject(err)
            }
          )

        return defer.promise
      }

      /**
       * taskService.FetchAllTodoTasks():
       *
       * Fetches all to do tasks for current user.
       * on success -> setting fetched to do task data to sessionStorage
       * on error -> sends error message from backend to control to be displayed in the view
       */
      taskService.FetchAllTodoTasks = function () {
        var authentication = authenticationService.getAuthenticationHeaders(),
          res = {},
          defer = $q.defer()

        $http
          .get($rootScope.backendUrl + '/tasks', {
            headers: {
              Authorization: `${authentication.token_type} ${authentication.access_token}`
            }
          })
          .then(
            function (response) {
              if (response.status === 200) {
                res.success = true
                res.data = response.data.data || []
              }

              sessionStorage.setItem('todoTasks', JSON.stringify(res.data))
              defer.resolve(res)
            },
            function (err) {
              defer.reject(err)
            }
          )

        return defer.promise
      }

      /**
       * service.getTodoTaskById():
       *
       * Takes id from routeParam
       * gets all to do task data from sessionStorage
       *
       * Perform a check for matching id's
       * returns `todoTaskObj` with matching id
       */
      taskService.getTodoTaskById = function (id) {
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

      /**
       * taskService.getTask():
       *
       * Takes the id of the task and returns that tasks object
       */
      taskService.getTask = function (id) {
        var tasksPromise = $q.resolve(JSON.parse(sessionStorage.getItem('todoTasks')))

        return tasksPromise.then(function (tasks) {
          for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) return tasks[i]
          }
        })
      }

      return taskService
    }
  ])
})()
