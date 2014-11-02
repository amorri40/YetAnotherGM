'use strict';

// Sprites controller
angular.module('sprites').controller('SpritesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Sprites',
	function($scope, $stateParams, $location, Authentication, Sprites ) {
		$scope.authentication = Authentication;

		// Create new Sprite
		$scope.create = function() {
			// Create new Sprite object
			var sprite = new Sprites ({
				name: this.name
			});

			// Redirect after save
			sprite.$save(function(response) {
				$location.path('sprites/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Sprite
		$scope.remove = function( sprite ) {
			if ( sprite ) { sprite.$remove();

				for (var i in $scope.sprites ) {
					if ($scope.sprites [i] === sprite ) {
						$scope.sprites.splice(i, 1);
					}
				}
			} else {
				$scope.sprite.$remove(function() {
					$location.path('sprites');
				});
			}
		};

		// Update existing Sprite
		$scope.update = function() {
			var sprite = $scope.sprite ;

			sprite.$update(function() {
				$location.path('sprites/' + sprite._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Sprites
		$scope.find = function() {
			$scope.sprites = Sprites.query();
		};

		// Find existing Sprite
		$scope.findOne = function() {
			$scope.sprite = Sprites.get({ 
				spriteId: $stateParams.spriteId
			});
		};
	}
]);