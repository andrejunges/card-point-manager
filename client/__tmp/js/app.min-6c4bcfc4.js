;(function(angular)
{
  "use strict";

  angular
    .module('myAwesomeApp', ['ngResource',
      'ngNewRouter',
      'ngMessages',
      'btford.socket-io',
      'emd.ng-xtorage'])
    .config(['$locationProvider', function($locationProvider)
    {
      $locationProvider.html5Mode(true);
    }]);

}(window.angular))


;(function(angular)
{
  "use strict";

  angular
    .module('myAwesomeApp')
    .factory('Todo', [function()
    {
      var Todo = function(todo)
      {
        this.todoMessage = null;

        angular.extend(this, todo);
      }

      var MIN_ACCEPTED_LENGTH = 5;

      Todo.prototype.isValid = function()
      {
        var _isDefined = angular.isDefined(this.todoMessage);
        var _isString = angular.isString(this.todoMessage);
        var _isBigEnough = (_isDefined && _isString) ? this.todoMessage.length >= MIN_ACCEPTED_LENGTH : false;

        return _isDefined && _isString && _isBigEnough;
      }

      return Todo;
    }]);

}(window.angular));


;(function(angular)
{
  "use strict";

  angular
    .module('myAwesomeApp')
    .factory('TodoDAO', ['$q', 'Todo', 'TodoResource', function($q, Todo, TodoResource)
    {
      var TodoDAO = function(){};

      TodoDAO.prototype.getAll = function()
      {
        var _onSuccess = function(todos)
        {
          // do something with the response from the server, like extending a model or something

          return todos; // this will be returned as a resolved promise
        }

        var _onError = function(error)
        {
          // do something with the error, like making it more readable or something

          return $q.reject(error); // this will be returned as a rejected promise
        }

        return TodoResource
          .query()
          .$promise
          .then(_onSuccess)
          .catch(_onError);
      };

      TodoDAO.prototype.createTodo = function(todo)
      {
        if (!angular.isObject(todo) || !(todo instanceof Todo) || !todo.isValid())
        {
          return $q.reject(new TypeError('Invalid todo to be created.'));
        }

        var _onSuccess = function(todo)
        {
          return new Todo(todo);
        }

        var _onError = function(error)
        {
          return $q.reject(error);
        }

        return TodoResource
          .save(todo)
          .$promise
          .then(_onSuccess)
          .catch(_onError);
      };

      TodoDAO.prototype.deleteTodo = function(id)
      {
        if (!angular.isString(id))
        {
          return $q.reject(new TypeError('Invalid id for deletion.'));
        }

        var _onSuccess = function()
        {
          return;
        }

        var _onError = function(error)
        {
          return $q.reject(error);
        }

        return TodoResource
          .delete({id: id})
          .$promise
          .then(_onSuccess)
          .catch(_onError)
      }


      return new TodoDAO();
    }]);

}(window.angular));

;(function(angular)
{
  "use strict";

  angular
    .module('myAwesomeApp')
    .factory('TodoResource', ['$resource', function($resource)
    {
      var _url = '/api/todos/:id';
      var _params = {};
      var _methods = {};

      return $resource(_url, _params, _methods);
    }]);


}(window.angular));

;(function(angular)
{
  "use strict";

  angular
    .module('myAwesomeApp')
    .controller('RouterController', ['$router', function($router)
    {
      var _paths = [];

      _paths.push({path: '/', component: 'todo'});

      $router.config(_paths);
    }]);

}(window.angular));
