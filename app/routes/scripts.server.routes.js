'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var scripts = require('../../app/controllers/scripts');

	// Scripts Routes
	app.route('/scripts')
		.get(scripts.list)
		.post(users.requiresLogin, scripts.create);

	app.route('/scripts/:scriptId')
		.get(scripts.read)
		.put(users.requiresLogin, scripts.hasAuthorization, scripts.update)
		.delete(users.requiresLogin, scripts.hasAuthorization, scripts.delete);

	// Finish by binding the Script middleware
	app.param('scriptId', scripts.scriptByID);
};