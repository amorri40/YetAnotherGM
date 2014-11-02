'use strict';

(function() {
	// Objects Controller Spec
	describe('Objects Controller Tests', function() {
		// Initialize global variables
		var ObjectsController,
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

			// Initialize the Objects controller.
			ObjectsController = $controller('ObjectsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Object object fetched from XHR', inject(function(Objects) {
			// Create sample Object using the Objects service
			var sampleObject = new Objects({
				name: 'New Object'
			});

			// Create a sample Objects array that includes the new Object
			var sampleObjects = [sampleObject];

			// Set GET response
			$httpBackend.expectGET('objects').respond(sampleObjects);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.objects).toEqualData(sampleObjects);
		}));

		it('$scope.findOne() should create an array with one Object object fetched from XHR using a objectId URL parameter', inject(function(Objects) {
			// Define a sample Object object
			var sampleObject = new Objects({
				name: 'New Object'
			});

			// Set the URL parameter
			$stateParams.objectId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/objects\/([0-9a-fA-F]{24})$/).respond(sampleObject);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.object).toEqualData(sampleObject);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Objects) {
			// Create a sample Object object
			var sampleObjectPostData = new Objects({
				name: 'New Object'
			});

			// Create a sample Object response
			var sampleObjectResponse = new Objects({
				_id: '525cf20451979dea2c000001',
				name: 'New Object'
			});

			// Fixture mock form input values
			scope.name = 'New Object';

			// Set POST response
			$httpBackend.expectPOST('objects', sampleObjectPostData).respond(sampleObjectResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Object was created
			expect($location.path()).toBe('/objects/' + sampleObjectResponse._id);
		}));

		it('$scope.update() should update a valid Object', inject(function(Objects) {
			// Define a sample Object put data
			var sampleObjectPutData = new Objects({
				_id: '525cf20451979dea2c000001',
				name: 'New Object'
			});

			// Mock Object in scope
			scope.object = sampleObjectPutData;

			// Set PUT response
			$httpBackend.expectPUT(/objects\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/objects/' + sampleObjectPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid objectId and remove the Object from the scope', inject(function(Objects) {
			// Create new Object object
			var sampleObject = new Objects({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Objects array and include the Object
			scope.objects = [sampleObject];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/objects\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleObject);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.objects.length).toBe(0);
		}));
	});
}());