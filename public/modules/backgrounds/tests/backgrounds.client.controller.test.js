'use strict';

(function() {
	// Backgrounds Controller Spec
	describe('Backgrounds Controller Tests', function() {
		// Initialize global variables
		var BackgroundsController,
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

			// Initialize the Backgrounds controller.
			BackgroundsController = $controller('BackgroundsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Background object fetched from XHR', inject(function(Backgrounds) {
			// Create sample Background using the Backgrounds service
			var sampleBackground = new Backgrounds({
				name: 'New Background'
			});

			// Create a sample Backgrounds array that includes the new Background
			var sampleBackgrounds = [sampleBackground];

			// Set GET response
			$httpBackend.expectGET('backgrounds').respond(sampleBackgrounds);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.backgrounds).toEqualData(sampleBackgrounds);
		}));

		it('$scope.findOne() should create an array with one Background object fetched from XHR using a backgroundId URL parameter', inject(function(Backgrounds) {
			// Define a sample Background object
			var sampleBackground = new Backgrounds({
				name: 'New Background'
			});

			// Set the URL parameter
			$stateParams.backgroundId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/backgrounds\/([0-9a-fA-F]{24})$/).respond(sampleBackground);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.background).toEqualData(sampleBackground);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Backgrounds) {
			// Create a sample Background object
			var sampleBackgroundPostData = new Backgrounds({
				name: 'New Background'
			});

			// Create a sample Background response
			var sampleBackgroundResponse = new Backgrounds({
				_id: '525cf20451979dea2c000001',
				name: 'New Background'
			});

			// Fixture mock form input values
			scope.name = 'New Background';

			// Set POST response
			$httpBackend.expectPOST('backgrounds', sampleBackgroundPostData).respond(sampleBackgroundResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Background was created
			expect($location.path()).toBe('/backgrounds/' + sampleBackgroundResponse._id);
		}));

		it('$scope.update() should update a valid Background', inject(function(Backgrounds) {
			// Define a sample Background put data
			var sampleBackgroundPutData = new Backgrounds({
				_id: '525cf20451979dea2c000001',
				name: 'New Background'
			});

			// Mock Background in scope
			scope.background = sampleBackgroundPutData;

			// Set PUT response
			$httpBackend.expectPUT(/backgrounds\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/backgrounds/' + sampleBackgroundPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid backgroundId and remove the Background from the scope', inject(function(Backgrounds) {
			// Create new Background object
			var sampleBackground = new Backgrounds({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Backgrounds array and include the Background
			scope.backgrounds = [sampleBackground];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/backgrounds\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBackground);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.backgrounds.length).toBe(0);
		}));
	});
}());