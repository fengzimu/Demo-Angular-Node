/*
* @Author: YADONG
* @Date:   2017-05-12 23:00:59
* @Last Modified by:   YADONG
* @Last Modified time: 2017-05-15 23:19:51
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
}]);
