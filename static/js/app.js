var app = angular.module('MyApp', []);
app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('/api/pictures/all').success(function(data){
		$scope.pics = data;
	})
}])