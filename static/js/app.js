var app = angular.module('MyApp', []);
app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('/api/pictures/all').success(function(data){
		$scope.pics = data;
	})

	$scope.getOther = function(){
		$http.get('/api/pictures/first?q=other').success(function(data){
			$scope.pics = data;
		})
	}
	$scope.getSexy = function(){
		$http.get('/api/pictures/first?q=sexy').success(function(data){
			$scope.pics = data;
		})

	}
	$scope.getLeg = function(){
		$http.get('/api/pictures/second?q=l').success(function(data){
			$scope.pics = data;
		})

	}
	$scope.getBoob = function(){
		$http.get('/api/pictures/second?q=b').success(function(data){
			$scope.pics = data;
		})

	}

	$scope.getBig = function(){
		$http.get('/api/pictures/third?q=big').success(function(data){
			$scope.pics = data;
		})

	}

	$scope.getSmall = function(){
		$http.get('/api/pictures/third?q=small').success(function(data){
			$scope.pics = data;
		})

	}

	$scope.getRecommend = function(id) {
		$http.get('/api/pictures/recommend/'+id).success(function(data){
			$scope.recommend = data;
		})
	}
}])