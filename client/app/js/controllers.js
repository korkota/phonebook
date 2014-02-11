'use strict';

/* Controllers */

var phonebookControllers = angular.module('phonebookControllers', []);

phonebookControllers.controller('SubscribersListCtrl', ['$scope', 'Subscribers', '$location',
  function($scope, Subscribers, $location) {
    $scope.subscribers = Subscribers.query();
    $scope.orderProp = 'name';

    $scope.edit = function(id) {
      $location.path('/edit-subscriber/' + id);
    };

    $scope.delete = function(id) {
      var success = function(temp) {
        $scope.subscribers = Subscribers.query();
      };

      var fail = function(temp) {
        console.log(arguments);
      };

      Subscribers.delete({ id: id }, success, fail );
    };
  }]);

phonebookControllers.controller('SubscriberAddCtrl', ['$scope', '$location', 'Subscribers',
  function($scope, $location, Subscribers) {
    $scope.subscriber = {name: '', phoneNumber: ''};

    $scope.create = function() {
      var success = function(temp) {
        $location.path('/subscribers');
      };

      var fail = function(temp) {
        $location.path('/subscribers');
      };

      Subscribers.create({
          name: $scope.subscriber.name,
          phoneNumber: $scope.subscriber.phoneNumber
        },
        success,
        fail
      );

      $scope.cancel = function () {
        $location.path('/subscribers');
      };
    };
  }]);

phonebookControllers.controller('SubscriberEditCtrl', ['$scope', '$routeParams', 'Subscribers', '$location',
  function ($scope, $routeParams, Subscribers, $location) {
    $scope.subscriber = Subscribers.read({id: $routeParams.id});

    $scope.update = function () {
      Subscribers.update({id: $scope.subscriber._id}, $scope.subscriber);
      $location.path('/subscribers');
    };

    $scope.cancel = function () {
      $location.path('/subscribers');
    };
  }]);