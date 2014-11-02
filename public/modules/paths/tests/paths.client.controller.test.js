'use strict';

(function() {
	// Paths Controller Spec
	describe('Paths Controller Tests', function() {
		// Initialize global variables
		var PathsController,
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

			// Initialize the Paths controller.
			PathsController = $controller('PathsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Path object fetched from XHR', inject(function(Paths) {
			// Create sample Path using the Paths service
			var samplePath = new Paths({
				name: 'New Path'
			});

			// Create a sample Paths array that includes the new Path
			var samplePaths = [samplePath];

			// Set GET response
			$httpBackend.expectGET('paths').respond(samplePaths);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.paths).toEqualData(samplePaths);
		}));

		it('$scope.findOne() should create an array with one Path object fetched from XHR using a pathId URL parameter', inject(function(Paths) {
			// Define a sample Path object
			var samplePath = new Paths({
				name: 'New Path'
			});

			// Set the URL parameter
			$stateParams.pathId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/paths\/([0-9a-fA-F]{24})$/).respond(samplePath);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.path).toEqualData(samplePath);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Paths) {
			// Create a sample Path object
			var samplePathPostData = new Paths({
				name: 'New Path'
			});

			// Create a sample Path response
			var samplePathResponse = new Paths({
				_id: '525cf20451979dea2c000001',
				name: 'New Path'
			});

			// Fixture mock form input values
			scope.name = 'New Path';

			// Set POST response
			$httpBackend.expectPOST('paths', samplePathPostData).respond(samplePathResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Path was created
			expect($location.path()).toBe('/paths/' + samplePathResponse._id);
		}));

		it('$scope.update() should update a valid Path', inject(function(Paths) {
			// Define a sample Path put data
			var samplePathPutData = new Paths({
				_id: '525cf20451979dea2c000001',
				name: 'New Path'
			});

			// Mock Path in scope
			scope.path = samplePathPutData;

			// Set PUT response
			$httpBackend.expectPUT(/paths\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/paths/' + samplePathPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pathId and remove the Path from the scope', inject(function(Paths) {
			// Create new Path object
			var samplePath = new Paths({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Paths array and include the Path
			scope.paths = [samplePath];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/paths\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePath);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.paths.length).toBe(0);
		}));
	});
}());