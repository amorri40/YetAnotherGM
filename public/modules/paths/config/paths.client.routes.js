'use strict';

//Setting up route
angular.module('paths').config(['$stateProvider',
	function($stateProvider) {
		// Paths state routing
		$stateProvider.
		state('listPaths', {
			url: '/paths',
			templateUrl: 'modules/paths/views/list-paths.client.view.html'
		}).
		state('createPath', {
			url: '/paths/create',
			templateUrl: 'modules/paths/views/create-path.client.view.html'
		}).
		state('viewPath', {
			url: '/paths/:pathId',
			templateUrl: 'modules/paths/views/view-path.client.view.html'
		}).
		state('editPath', {
			url: '/paths/:pathId/edit',
			templateUrl: 'modules/paths/views/edit-path.client.view.html'
		});
	}
]);