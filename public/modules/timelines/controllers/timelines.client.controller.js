'use strict';

// Timelines controller
angular.module('timelines').controller('TimelinesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Timelines',
	function($scope, $stateParams, $location, Authentication, Timelines ) {
		$scope.authentication = Authentication;

		// Create new Timeline
		$scope.create = function() {
			// Create new Timeline object
			var timeline = new Timelines ({
				name: this.name
			});

			// Redirect after save
			timeline.$save(function(response) {
				$location.path('timelines/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Timeline
		$scope.remove = function( timeline ) {
			if ( timeline ) { timeline.$remove();

				for (var i in $scope.timelines ) {
					if ($scope.timelines [i] === timeline ) {
						$scope.timelines.splice(i, 1);
					}
				}
			} else {
				$scope.timeline.$remove(function() {
					$location.path('timelines');
				});
			}
		};

		// Update existing Timeline
		$scope.update = function() {
			var timeline = $scope.timeline ;

			timeline.$update(function() {
				$location.path('timelines/' + timeline._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Timelines
		$scope.find = function() {
			$scope.timelines = Timelines.query();
		};

		// Find existing Timeline
		$scope.findOne = function() {
			$scope.timeline = Timelines.get({ 
				timelineId: $stateParams.timelineId
			});
		};
	}
]);