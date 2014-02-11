'use strict';

/* Services */

var phonebookServices = angular.module('phonebookServices', ['ngResource']);

phonebookServices.factory('Subscribers', ['$resource',
  function($resource) {
    return $resource('/api/subscribers/:id', {}, {
      'read':   {method:'GET'},
      'create': {method:'POST'},
      'update': {method:'PUT'},
      'delete': {method:'DELETE'},
      'query':  {method:'GET', isArray:true}
    })
  }]
);
