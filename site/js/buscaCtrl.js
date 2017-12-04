app.controller('buscaCtrl', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
	
	$scope.carregando = false;
	
	$rootScope.buscar = function(){
		$scope.carregando = true;
		$http.get('http://localhost:3000/api/items?q=' + $rootScope.txtBusca).then(function(res){
			$scope.carregando = false;
			$scope.resultados = res.data.items;
		}, function(err){
			$scope.carregando = false;
		});
	}
	
	if ($location.$$search.search != undefined){
		$rootScope.txtBusca = $location.$$search.search;
		$rootScope.buscar();
	}
}]);