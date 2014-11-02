'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var sprites = require('../../app/controllers/sprites');

	// Sprites Routes
	app.route('/sprites')
		.get(sprites.list)
		.post(users.requiresLogin, sprites.create);

	app.route('/sprites/:spriteId')
		.get(sprites.read)
		.put(users.requiresLogin, sprites.hasAuthorization, sprites.update)
		.delete(users.requiresLogin, sprites.hasAuthorization, sprites.delete);

	// Finish by binding the Sprite middleware
	app.param('spriteId', sprites.spriteByID);
};