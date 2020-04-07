;(function () {
  angular.module('TodoApp').directive('fileinput', [
    function () {
      return {
        scope: {
          fileinput: '=',
          filepreview: '='
        },
        link: function (scope, element, attributes) {
          element.bind('change', function (changeEvent) {
            scope.fileinput = changeEvent.target.files[0]
            var reader = new FileReader()
            reader.onload = function (loadEvent) {
              scope.$apply(function () {
                scope.filepreview = loadEvent.target.result
              })
            }
            scope.$watch('filepreview', function (newValue, oldValue) {
              if (newValue === undefined && oldValue !== undefined) {
                /**
                 * Resetting file input should the user click on the cancel upload.
                 * FileListItem() -> sets the files with a FileList
                 * ! This is an alternative way of creating the "FileList"
                 */
                function FileListItem(a) {
                  a = [].slice.call(Array.isArray(a) ? a : arguments)
                  for (var c, b = (c = a.length), d = !0; b-- && d; ) d = a[b] instanceof File
                  if (!d) throw new TypeError('expected argument to FileList is File or array of File objects')
                  for (b = new ClipboardEvent('').clipboardData || new DataTransfer(); c--; ) b.items.add(a[c])
                  return b.files
                }

                element[0].files = new FileListItem([])
              }
            })
            reader.readAsDataURL(scope.fileinput)
          })
        }
      }
    }
  ])
})()
