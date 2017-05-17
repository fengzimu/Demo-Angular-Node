/*
* @Author: YADONG
* @Date:   2017-05-12 23:00:59
* @Last Modified by:   fengzimu
* @Last Modified time: 2017-05-17 22:44:24
*/

//'use strict';
var application = angular.module("application", []);

application.controller("appController", ['$scope', '$http', function($scope, $http){
	console.log("Welcome to controller");
	var refresh = function(){
		// Simple GET request example:
		$http({
		  method: 'GET',
		  url: '/contactList'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
			console.log(response.data);
			$scope.contactList = response.data;
			$scope.newContact = {};
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	};

	refresh();

	$scope.addContact = function(){
		console.log("new contact is: "+ $scope.newContact);
		$http.post('/contactList',$scope.newContact).then(function success(response){
			console.log(response);
			refresh();
		});
	};

	$scope.removeContact = function(id){
		console.log("remove: " + id);
		$http.delete('/contactList/'+ id).then(function success(response){
			refresh();
		});
	};

	$scope.editContact = function(id){
		console.log("edit: " + id);
		$http.get('/contactList/' + id).then(function success(response){
			$scope.newContact = response.data;
		});
	};

	$scope.updateContact = function(){
		var id = $scope.newContact._id;
		console.log("update: " + id);
		$http.put('/contactList/'+ id, $scope.newContact).then(function success(response){
			refresh();
		});
	};

	$scope.clearContact =function(){
		$scope.newContact = {};
	};
}]);
