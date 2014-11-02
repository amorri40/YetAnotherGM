'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var sounds = require('../../app/controllers/sounds');

	// Sounds Routes
	app.route('/sounds')
		.get(sounds.list)
		.post(users.requiresLogin, sounds.create);

	app.route('/sounds/:soundId')
		.get(sounds.read)
		.put(users.requiresLogin, sounds.hasAuthorization, sounds.update)
		.delete(users.requiresLogin, sounds.hasAuthorization, sounds.delete);

	// Finish by binding the Sound middleware
	app.param('soundId', sounds.soundByID);
};