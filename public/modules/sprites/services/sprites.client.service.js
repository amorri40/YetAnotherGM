'use strict';

//Sprites service used to communicate Sprites REST endpoints
angular.module('sprites').factory('Sprites', ['$resource',
	function($resource) {
		return $resource('sprites/:spriteId', { spriteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);