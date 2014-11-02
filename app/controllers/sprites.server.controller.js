'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Sprite = mongoose.model('Sprite'),
	_ = require('lodash');

/**
 * Create a Sprite
 */
exports.create = function(req, res) {
	var sprite = new Sprite(req.body);
	sprite.user = req.user;

	sprite.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sprite);
		}
	});
};

/**
 * Show the current Sprite
 */
exports.read = function(req, res) {
	res.jsonp(req.sprite);
};

/**
 * Update a Sprite
 */
exports.update = function(req, res) {
	var sprite = req.sprite ;

	sprite = _.extend(sprite , req.body);

	sprite.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sprite);
		}
	});
};

/**
 * Delete an Sprite
 */
exports.delete = function(req, res) {
	var sprite = req.sprite ;

	sprite.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sprite);
		}
	});
};

/**
 * List of Sprites
 */
exports.list = function(req, res) { Sprite.find().sort('-created').populate('user', 'displayName').exec(function(err, sprites) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sprites);
		}
	});
};

/**
 * Sprite middleware
 */
exports.spriteByID = function(req, res, next, id) { Sprite.findById(id).populate('user', 'displayName').exec(function(err, sprite) {
		if (err) return next(err);
		if (! sprite) return next(new Error('Failed to load Sprite ' + id));
		req.sprite = sprite ;
		next();
	});
};

/**
 * Sprite authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.sprite.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};