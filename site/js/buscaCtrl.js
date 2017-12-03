(function () {
	angular.module('MeuApp').controller('buscaCtrl', ['$scope', '$location', function ($scope, $location) {
		$scope.pagina = 'BUSCA ->' + $location.$$search.search;
	}]);
});