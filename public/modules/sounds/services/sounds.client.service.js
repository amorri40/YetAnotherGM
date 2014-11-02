'use strict';

//Sounds service used to communicate Sounds REST endpoints
angular.module('sounds').factory('Sounds', ['$resource',
	function($resource) {
		return $resource('sounds/:soundId', { soundId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);