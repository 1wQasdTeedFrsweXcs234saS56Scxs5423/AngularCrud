'use strict';

/**
 * @ngdoc function
 * @name angulardbApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angulardbApp
 */
angular.module('angulardbApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	  	console.log("Hello World from Controller...");
		
		var refresh = function()
		{
			$http.get('/contactlist').success(function(response){
				console.log("I GOT THE DATA I REQUESTED "+response);
				$scope.contactlist = response;
				$scope.contact = "";
			});
		};
		
		refresh();
			
		$scope.addContact = function(){
			console.log("Send Contact to server... " + $scope.contact);
			
			// POST REQUEST
			$http.post('/contactlist', $scope.contact).success(function(response, request){
					refresh();
				});
		};
		
		$scope.remove = function(id){
			console.log("This contact is to be remover " + id);	
			
			$http.delete('/contactlist/'+id, $scope.contact).success(function(response, request){
					console.log("Deleted Contact from server... ");
					refresh();
				});
		};
		
		$scope.edit = function(id){
			console.log("This contact is to be edited ON SERVER " + id);	
			
			$http.get('/contactlist/'+id).success(function(response){
				console.log("request contact details "+response.name);
				$scope.contact = response;
			});
			
		};
		
		$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};
		
	  }]);
