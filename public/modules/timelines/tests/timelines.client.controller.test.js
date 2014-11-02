'use strict';

(function() {
	// Timelines Controller Spec
	describe('Timelines Controller Tests', function() {
		// Initialize global variables
		var TimelinesController,
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

			// Initialize the Timelines controller.
			TimelinesController = $controller('TimelinesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Timeline object fetched from XHR', inject(function(Timelines) {
			// Create sample Timeline using the Timelines service
			var sampleTimeline = new Timelines({
				name: 'New Timeline'
			});

			// Create a sample Timelines array that includes the new Timeline
			var sampleTimelines = [sampleTimeline];

			// Set GET response
			$httpBackend.expectGET('timelines').respond(sampleTimelines);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.timelines).toEqualData(sampleTimelines);
		}));

		it('$scope.findOne() should create an array with one Timeline object fetched from XHR using a timelineId URL parameter', inject(function(Timelines) {
			// Define a sample Timeline object
			var sampleTimeline = new Timelines({
				name: 'New Timeline'
			});

			// Set the URL parameter
			$stateParams.timelineId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/timelines\/([0-9a-fA-F]{24})$/).respond(sampleTimeline);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.timeline).toEqualData(sampleTimeline);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Timelines) {
			// Create a sample Timeline object
			var sampleTimelinePostData = new Timelines({
				name: 'New Timeline'
			});

			// Create a sample Timeline response
			var sampleTimelineResponse = new Timelines({
				_id: '525cf20451979dea2c000001',
				name: 'New Timeline'
			});

			// Fixture mock form input values
			scope.name = 'New Timeline';

			// Set POST response
			$httpBackend.expectPOST('timelines', sampleTimelinePostData).respond(sampleTimelineResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Timeline was created
			expect($location.path()).toBe('/timelines/' + sampleTimelineResponse._id);
		}));

		it('$scope.update() should update a valid Timeline', inject(function(Timelines) {
			// Define a sample Timeline put data
			var sampleTimelinePutData = new Timelines({
				_id: '525cf20451979dea2c000001',
				name: 'New Timeline'
			});

			// Mock Timeline in scope
			scope.timeline = sampleTimelinePutData;

			// Set PUT response
			$httpBackend.expectPUT(/timelines\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/timelines/' + sampleTimelinePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid timelineId and remove the Timeline from the scope', inject(function(Timelines) {
			// Create new Timeline object
			var sampleTimeline = new Timelines({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Timelines array and include the Timeline
			scope.timelines = [sampleTimeline];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/timelines\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTimeline);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.timelines.length).toBe(0);
		}));
	});
}());