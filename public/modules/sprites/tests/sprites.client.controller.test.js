'use strict';

(function() {
	// Sprites Controller Spec
	describe('Sprites Controller Tests', function() {
		// Initialize global variables
		var SpritesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Sprites controller.
			SpritesController = $controller('SpritesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Sprite object fetched from XHR', inject(function(Sprites) {
			// Create sample Sprite using the Sprites service
			var sampleSprite = new Sprites({
				name: 'New Sprite'
			});

			// Create a sample Sprites array that includes the new Sprite
			var sampleSprites = [sampleSprite];

			// Set GET response
			$httpBackend.expectGET('sprites').respond(sampleSprites);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sprites).toEqualData(sampleSprites);
		}));

		it('$scope.findOne() should create an array with one Sprite object fetched from XHR using a spriteId URL parameter', inject(function(Sprites) {
			// Define a sample Sprite object
			var sampleSprite = new Sprites({
				name: 'New Sprite'
			});

			// Set the URL parameter
			$stateParams.spriteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/sprites\/([0-9a-fA-F]{24})$/).respond(sampleSprite);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sprite).toEqualData(sampleSprite);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Sprites) {
			// Create a sample Sprite object
			var sampleSpritePostData = new Sprites({
				name: 'New Sprite'
			});

			// Create a sample Sprite response
			var sampleSpriteResponse = new Sprites({
				_id: '525cf20451979dea2c000001',
				name: 'New Sprite'
			});

			// Fixture mock form input values
			scope.name = 'New Sprite';

			// Set POST response
			$httpBackend.expectPOST('sprites', sampleSpritePostData).respond(sampleSpriteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Sprite was created
			expect($location.path()).toBe('/sprites/' + sampleSpriteResponse._id);
		}));

		it('$scope.update() should update a valid Sprite', inject(function(Sprites) {
			// Define a sample Sprite put data
			var sampleSpritePutData = new Sprites({
				_id: '525cf20451979dea2c000001',
				name: 'New Sprite'
			});

			// Mock Sprite in scope
			scope.sprite = sampleSpritePutData;

			// Set PUT response
			$httpBackend.expectPUT(/sprites\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/sprites/' + sampleSpritePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid spriteId and remove the Sprite from the scope', inject(function(Sprites) {
			// Create new Sprite object
			var sampleSprite = new Sprites({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Sprites array and include the Sprite
			scope.sprites = [sampleSprite];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/sprites\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSprite);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.sprites.length).toBe(0);
		}));
	});
}());