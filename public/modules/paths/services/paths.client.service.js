'use strict';

//Paths service used to communicate Paths REST endpoints
angular.module('paths').factory('Paths', ['$resource',
	function($resource) {
		return $resource('paths/:pathId', { pathId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);