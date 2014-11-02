'use strict';

//Setting up route
angular.module('scripts').config(['$stateProvider',
	function($stateProvider) {
		// Scripts state routing
		$stateProvider.
		state('listScripts', {
			url: '/scripts',
			templateUrl: 'modules/scripts/views/list-scripts.client.view.html'
		}).
		state('createScript', {
			url: '/scripts/create',
			templateUrl: 'modules/scripts/views/create-script.client.view.html'
		}).
		state('viewScript', {
			url: '/scripts/:scriptId',
			templateUrl: 'modules/scripts/views/view-script.client.view.html'
		}).
		state('editScript', {
			url: '/scripts/:scriptId/edit',
			templateUrl: 'modules/scripts/views/edit-script.client.view.html'
		});
	}
]);