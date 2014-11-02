'use strict';

//Timelines service used to communicate Timelines REST endpoints
angular.module('timelines').factory('Timelines', ['$resource',
	function($resource) {
		return $resource('timelines/:timelineId', { timelineId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);