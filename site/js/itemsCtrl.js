app.controller('itemCtrl', ['$scope', '$routeParams', '$location', '$rootScope', function ($scope, $routeParams, $location, $rootScope) {
		alert('Sua busca: ' + $routeParams.id);
		$rootScope.txtBusca = '';
	}]);