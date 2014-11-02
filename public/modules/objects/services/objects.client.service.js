'use strict';

//Objects service used to communicate Objects REST endpoints
angular.module('objects').factory('Objects', ['$resource',
	function($resource) {
		return $resource('objects/:objectId', { objectId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);