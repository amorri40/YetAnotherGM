'use strict';

// Backgrounds controller
angular.module('backgrounds').controller('BackgroundsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Backgrounds',
	function($scope, $stateParams, $location, Authentication, Backgrounds ) {
		$scope.authentication = Authentication;

		// Create new Background
		$scope.create = function() {
			// Create new Background object
			var background = new Backgrounds ({
				name: this.name
			});

			// Redirect after save
			background.$save(function(response) {
				$location.path('backgrounds/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Background
		$scope.remove = function( background ) {
			if ( background ) { background.$remove();

				for (var i in $scope.backgrounds ) {
					if ($scope.backgrounds [i] === background ) {
						$scope.backgrounds.splice(i, 1);
					}
				}
			} else {
				$scope.background.$remove(function() {
					$location.path('backgrounds');
				});
			}
		};

		// Update existing Background
		$scope.update = function() {
			var background = $scope.background ;

			background.$update(function() {
				$location.path('backgrounds/' + background._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Backgrounds
		$scope.find = function() {
			$scope.backgrounds = Backgrounds.query();
		};

		// Find existing Background
		$scope.findOne = function() {
			$scope.background = Backgrounds.get({ 
				backgroundId: $stateParams.backgroundId
			});
		};
	}
]);