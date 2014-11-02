'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var timelines = require('../../app/controllers/timelines');

	// Timelines Routes
	app.route('/timelines')
		.get(timelines.list)
		.post(users.requiresLogin, timelines.create);

	app.route('/timelines/:timelineId')
		.get(timelines.read)
		.put(users.requiresLogin, timelines.hasAuthorization, timelines.update)
		.delete(users.requiresLogin, timelines.hasAuthorization, timelines.delete);

	// Finish by binding the Timeline middleware
	app.param('timelineId', timelines.timelineByID);
};