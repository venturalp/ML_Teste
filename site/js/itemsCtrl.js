app.controller('itemCtrl', ['$scope', '$routeParams', '$location', '$rootScope', '$http', function ($scope, $routeParams, $location, $rootScope, $http) {
//	alert('Sua busca: ' + $routeParams.id);
	$rootScope.txtBusca = '';
	$scope.carregando = false;
	
	$rootScope.buscar = function(){
		window.location = "#!/items?search=" + $rootScope.txtBusca;
	}
		
	$scope.getDados = function(){
		$scope.carregando = true;		
		$http.get('http://localhost:3000/api/items/' + $routeParams.id).then(function(res){
			$scope.carregando = false;
			$scope.item = res.data.item;			
		}, function(err){
			$scope.carregando = false;
			console.log(err);
		})
	}
	
	$scope.getDados();
}]);