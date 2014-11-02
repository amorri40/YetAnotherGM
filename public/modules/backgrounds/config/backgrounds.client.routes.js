'use strict';

//Setting up route
angular.module('backgrounds').config(['$stateProvider',
	function($stateProvider) {
		// Backgrounds state routing
		$stateProvider.
		state('listBackgrounds', {
			url: '/backgrounds',
			templateUrl: 'modules/backgrounds/views/list-backgrounds.client.view.html'
		}).
		state('createBackground', {
			url: '/backgrounds/create',
			templateUrl: 'modules/backgrounds/views/create-background.client.view.html'
		}).
		state('viewBackground', {
			url: '/backgrounds/:backgroundId',
			templateUrl: 'modules/backgrounds/views/view-background.client.view.html'
		}).
		state('editBackground', {
			url: '/backgrounds/:backgroundId/edit',
			templateUrl: 'modules/backgrounds/views/edit-background.client.view.html'
		});
	}
]);