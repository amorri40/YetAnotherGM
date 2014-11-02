'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var objects = require('../../app/controllers/objects');

	// Objects Routes
	app.route('/objects')
		.get(objects.list)
		.post(users.requiresLogin, objects.create);

	app.route('/objects/:objectId')
		.get(objects.read)
		.put(users.requiresLogin, objects.hasAuthorization, objects.update)
		.delete(users.requiresLogin, objects.hasAuthorization, objects.delete);

	// Finish by binding the Object middleware
	app.param('objectId', objects.objectByID);
};