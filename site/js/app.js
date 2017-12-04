var app = angular.module('MeuApp', ['ngRoute'])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'busca.html',
				controller: 'buscaCtrl'
			})
			.when('/items/:id', {
				templateUrl: 'item.html',
				controller: 'itemCtrl'
			})
			.when('/items', {
				templateUrl: 'busca.html',
				controller: 'buscaCtrl'
			}).otherwise({
				redirectTo: '/'
			});
	})