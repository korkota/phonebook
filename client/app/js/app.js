'use strict';

/* App Module */

var phonebookApp = angular.module('phonebookApp', [
  'ngRoute',
  'phonebookControllers',
  'phonebookFilters',
  'phonebookServices'
]);

phonebookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/subscribers', {
        templateUrl: 'partials/subscribers.html',
        controller: 'SubscribersListCtrl'
      }).
      when('/add-subscriber', {
        templateUrl: 'partials/add-subscriber.html',
        controller: 'SubscriberAddCtrl'
      }).
      when('/edit-subscriber/:id', {
        templateUrl: 'partials/edit-subscriber.html',
        controller: 'SubscriberEditCtrl'
      }).
      otherwise({
        redirectTo: '/subscribers'
      });
  }]);