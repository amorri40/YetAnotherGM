'use strict';

// Objects controller
angular.module('objects').controller('ObjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Objects',
	function($scope, $stateParams, $location, Authentication, Objects ) {
		$scope.authentication = Authentication;

		// Create new Object
		$scope.create = function() {
			// Create new Object object
			var object = new Objects ({
				name: this.name
			});

			// Redirect after save
			object.$save(function(response) {
				$location.path('objects/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Object
		$scope.remove = function( object ) {
			if ( object ) { object.$remove();

				for (var i in $scope.objects ) {
					if ($scope.objects [i] === object ) {
						$scope.objects.splice(i, 1);
					}
				}
			} else {
				$scope.object.$remove(function() {
					$location.path('objects');
				});
			}
		};

		// Update existing Object
		$scope.update = function() {
			var object = $scope.object ;

			object.$update(function() {
				$location.path('objects/' + object._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Objects
		$scope.find = function() {
			$scope.objects = Objects.query();
		};

		// Find existing Object
		$scope.findOne = function() {
			$scope.object = Objects.get({ 
				objectId: $stateParams.objectId
			});
		};
	}
]);