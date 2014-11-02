'use strict';

//Setting up route
angular.module('objects').config(['$stateProvider',
	function($stateProvider) {
		// Objects state routing
		$stateProvider.
		state('listObjects', {
			url: '/objects',
			templateUrl: 'modules/objects/views/list-objects.client.view.html'
		}).
		state('createObject', {
			url: '/objects/create',
			templateUrl: 'modules/objects/views/create-object.client.view.html'
		}).
		state('viewObject', {
			url: '/objects/:objectId',
			templateUrl: 'modules/objects/views/view-object.client.view.html'
		}).
		state('editObject', {
			url: '/objects/:objectId/edit',
			templateUrl: 'modules/objects/views/edit-object.client.view.html'
		});
	}
]);