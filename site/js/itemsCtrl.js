(function () {
	angular.module('MeuApp').controller('itemCtrl', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
		alert('Sua busca: ' + $routeParams.id);
	}]);
})();