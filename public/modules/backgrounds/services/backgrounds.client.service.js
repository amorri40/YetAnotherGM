'use strict';

//Backgrounds service used to communicate Backgrounds REST endpoints
angular.module('backgrounds').factory('Backgrounds', ['$resource',
	function($resource) {
		return $resource('backgrounds/:backgroundId', { backgroundId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);