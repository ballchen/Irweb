var app = angular.module('MyApp', []);

var cp;

var openRecommend = function() {
	console.log(cp.id);
	console.log('FUCKYOU')
	$.ajax("/api/pictures/recommend/"+cp.id).success(function(data){
		console.log(data);
		var items = []
		data.forEach(function(d){
			var n = {
				src: d.images[0]
			}
			items.push(n);
		})
		console.log(items);

		$.magnificPopup.open({
			items: items,
			type: 'image',
			gallery: {
				enabled: true
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return '<h4>你可能也會喜歡</h4>';
				}
			}
		});

		$.magnificPopup.instance.next();
	});
	
}
app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){


	$(document).ready(function(){
		$('.parent-container').magnificPopup({
			delegate: 'a', // child items selector, by clicking on it popup will open
		 	type: 'image',
		 	tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			verticalFit: true, // Fits image in area vertically
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return '<button class="btn btn-primary btn-heart" onclick="openRecommend()">喜愛<i class="fa fa-heart"></i></button>';
				}
			}
		});

	});


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

	$scope.click = function(p){
		cp = p;
	}
}])