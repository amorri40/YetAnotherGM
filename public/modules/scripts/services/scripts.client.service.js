'use strict';

//Scripts service used to communicate Scripts REST endpoints
angular.module('scripts').factory('Scripts', ['$resource',
	function($resource) {
		return $resource('scripts/:scriptId', { scriptId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);