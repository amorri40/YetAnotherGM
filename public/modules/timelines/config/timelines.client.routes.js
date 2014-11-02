'use strict';

//Setting up route
angular.module('timelines').config(['$stateProvider',
	function($stateProvider) {
		// Timelines state routing
		$stateProvider.
		state('listTimelines', {
			url: '/timelines',
			templateUrl: 'modules/timelines/views/list-timelines.client.view.html'
		}).
		state('createTimeline', {
			url: '/timelines/create',
			templateUrl: 'modules/timelines/views/create-timeline.client.view.html'
		}).
		state('viewTimeline', {
			url: '/timelines/:timelineId',
			templateUrl: 'modules/timelines/views/view-timeline.client.view.html'
		}).
		state('editTimeline', {
			url: '/timelines/:timelineId/edit',
			templateUrl: 'modules/timelines/views/edit-timeline.client.view.html'
		});
	}
]);