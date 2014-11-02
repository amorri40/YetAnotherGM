'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var paths = require('../../app/controllers/paths');

	// Paths Routes
	app.route('/paths')
		.get(paths.list)
		.post(users.requiresLogin, paths.create);

	app.route('/paths/:pathId')
		.get(paths.read)
		.put(users.requiresLogin, paths.hasAuthorization, paths.update)
		.delete(users.requiresLogin, paths.hasAuthorization, paths.delete);

	// Finish by binding the Path middleware
	app.param('pathId', paths.pathByID);
};