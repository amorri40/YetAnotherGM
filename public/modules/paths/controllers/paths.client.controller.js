'use strict';

// Paths controller
angular.module('paths').controller('PathsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Paths',
	function($scope, $stateParams, $location, Authentication, Paths ) {
		$scope.authentication = Authentication;

		// Create new Path
		$scope.create = function() {
			// Create new Path object
			var path = new Paths ({
				name: this.name
			});

			// Redirect after save
			path.$save(function(response) {
				$location.path('paths/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Path
		$scope.remove = function( path ) {
			if ( path ) { path.$remove();

				for (var i in $scope.paths ) {
					if ($scope.paths [i] === path ) {
						$scope.paths.splice(i, 1);
					}
				}
			} else {
				$scope.path.$remove(function() {
					$location.path('paths');
				});
			}
		};

		// Update existing Path
		$scope.update = function() {
			var path = $scope.path ;

			path.$update(function() {
				$location.path('paths/' + path._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Paths
		$scope.find = function() {
			$scope.paths = Paths.query();
		};

		// Find existing Path
		$scope.findOne = function() {
			$scope.path = Paths.get({ 
				pathId: $stateParams.pathId
			});
		};
	}
]);