'use strict';

//Setting up route
angular.module('sprites').config(['$stateProvider',
	function($stateProvider) {
		// Sprites state routing
		$stateProvider.
		state('listSprites', {
			url: '/sprites',
			templateUrl: 'modules/sprites/views/list-sprites.client.view.html'
		}).
		state('createSprite', {
			url: '/sprites/create',
			templateUrl: 'modules/sprites/views/create-sprite.client.view.html'
		}).
		state('viewSprite', {
			url: '/sprites/:spriteId',
			templateUrl: 'modules/sprites/views/view-sprite.client.view.html'
		}).
		state('editSprite', {
			url: '/sprites/:spriteId/edit',
			templateUrl: 'modules/sprites/views/edit-sprite.client.view.html'
		});
	}
]);