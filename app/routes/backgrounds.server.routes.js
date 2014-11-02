'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var backgrounds = require('../../app/controllers/backgrounds');

	// Backgrounds Routes
	app.route('/backgrounds')
		.get(backgrounds.list)
		.post(users.requiresLogin, backgrounds.create);

	app.route('/backgrounds/:backgroundId')
		.get(backgrounds.read)
		.put(users.requiresLogin, backgrounds.hasAuthorization, backgrounds.update)
		.delete(users.requiresLogin, backgrounds.hasAuthorization, backgrounds.delete);

	// Finish by binding the Background middleware
	app.param('backgroundId', backgrounds.backgroundByID);
};