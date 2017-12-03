(function () {
	angular.module('App').controller('queryCtrl', ['$scope', '$location', function ($scope, $location) {
		$scope.pagina = 'BUSCA Query';
		
		if ($location.$$search.search != '')
			alert('query de busca');
	}]);
});