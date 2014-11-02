'use strict';

// Scripts controller
angular.module('scripts').controller('ScriptsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Scripts',
	function($scope, $stateParams, $location, Authentication, Scripts ) {
		$scope.authentication = Authentication;

		// Create new Script
		$scope.create = function() {
			// Create new Script object
			var script = new Scripts ({
				name: this.name
			});

			// Redirect after save
			script.$save(function(response) {
				$location.path('scripts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Script
		$scope.remove = function( script ) {
			if ( script ) { script.$remove();

				for (var i in $scope.scripts ) {
					if ($scope.scripts [i] === script ) {
						$scope.scripts.splice(i, 1);
					}
				}
			} else {
				$scope.script.$remove(function() {
					$location.path('scripts');
				});
			}
		};

		// Update existing Script
		$scope.update = function() {
			var script = $scope.script ;

			script.$update(function() {
				$location.path('scripts/' + script._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Scripts
		$scope.find = function() {
			$scope.scripts = Scripts.query();
		};

		// Find existing Script
		$scope.findOne = function() {
			$scope.script = Scripts.get({ 
				scriptId: $stateParams.scriptId
			});
		};
	}
]);