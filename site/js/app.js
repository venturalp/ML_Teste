(function () {
	angular.module('MeuApp', ['ngRoute'])
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
	
//	.controller('itemCtrl', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
//		alert('Sua busca: ' + $routeParams.id);
//	}])
//	
//	.controller('buscaCtrl', ['$scope', '$location', function ($scope, $location) {
//		$scope.pagina = 'BUSCA ->' + $location.$$search.search;
//		
//	}])
//	
//	.controller('queryCtrl', ['$scope', '$location', function ($scope, $location) {
//		$scope.pagina = 'BUSCA Query';
//		
//		if ($location.$$search.search != '')
//			alert('query de busca');
//	}])
})();