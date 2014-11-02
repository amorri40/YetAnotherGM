'use strict';

//Setting up route
angular.module('sounds').config(['$stateProvider',
	function($stateProvider) {
		// Sounds state routing
		$stateProvider.
		state('listSounds', {
			url: '/sounds',
			templateUrl: 'modules/sounds/views/list-sounds.client.view.html'
		}).
		state('createSound', {
			url: '/sounds/create',
			templateUrl: 'modules/sounds/views/create-sound.client.view.html'
		}).
		state('viewSound', {
			url: '/sounds/:soundId',
			templateUrl: 'modules/sounds/views/view-sound.client.view.html'
		}).
		state('editSound', {
			url: '/sounds/:soundId/edit',
			templateUrl: 'modules/sounds/views/edit-sound.client.view.html'
		});
	}
]);