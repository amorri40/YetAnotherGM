'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Background = mongoose.model('Background'),
	_ = require('lodash');

/**
 * Create a Background
 */
exports.create = function(req, res) {
	var background = new Background(req.body);
	background.user = req.user;

	background.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(background);
		}
	});
};

/**
 * Show the current Background
 */
exports.read = function(req, res) {
	res.jsonp(req.background);
};

/**
 * Update a Background
 */
exports.update = function(req, res) {
	var background = req.background ;

	background = _.extend(background , req.body);

	background.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(background);
		}
	});
};

/**
 * Delete an Background
 */
exports.delete = function(req, res) {
	var background = req.background ;

	background.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(background);
		}
	});
};

/**
 * List of Backgrounds
 */
exports.list = function(req, res) { Background.find().sort('-created').populate('user', 'displayName').exec(function(err, backgrounds) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(backgrounds);
		}
	});
};

/**
 * Background middleware
 */
exports.backgroundByID = function(req, res, next, id) { Background.findById(id).populate('user', 'displayName').exec(function(err, background) {
		if (err) return next(err);
		if (! background) return next(new Error('Failed to load Background ' + id));
		req.background = background ;
		next();
	});
};

/**
 * Background authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.background.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};