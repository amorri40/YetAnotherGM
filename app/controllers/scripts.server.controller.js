'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Script = mongoose.model('Script'),
	_ = require('lodash');

/**
 * Create a Script
 */
exports.create = function(req, res) {
	var script = new Script(req.body);
	script.user = req.user;

	script.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(script);
		}
	});
};

/**
 * Show the current Script
 */
exports.read = function(req, res) {
	res.jsonp(req.script);
};

/**
 * Update a Script
 */
exports.update = function(req, res) {
	var script = req.script ;

	script = _.extend(script , req.body);

	script.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(script);
		}
	});
};

/**
 * Delete an Script
 */
exports.delete = function(req, res) {
	var script = req.script ;

	script.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(script);
		}
	});
};

/**
 * List of Scripts
 */
exports.list = function(req, res) { Script.find().sort('-created').populate('user', 'displayName').exec(function(err, scripts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(scripts);
		}
	});
};

/**
 * Script middleware
 */
exports.scriptByID = function(req, res, next, id) { Script.findById(id).populate('user', 'displayName').exec(function(err, script) {
		if (err) return next(err);
		if (! script) return next(new Error('Failed to load Script ' + id));
		req.script = script ;
		next();
	});
};

/**
 * Script authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.script.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};