'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Object = mongoose.model('Object'),
	_ = require('lodash');

/**
 * Create a Object
 */
exports.create = function(req, res) {
	var object = new Object(req.body);
	object.user = req.user;

	object.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(object);
		}
	});
};

/**
 * Show the current Object
 */
exports.read = function(req, res) {
	res.jsonp(req.object);
};

/**
 * Update a Object
 */
exports.update = function(req, res) {
	var object = req.object ;

	object = _.extend(object , req.body);

	object.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(object);
		}
	});
};

/**
 * Delete an Object
 */
exports.delete = function(req, res) {
	var object = req.object ;

	object.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(object);
		}
	});
};

/**
 * List of Objects
 */
exports.list = function(req, res) { Object.find().sort('-created').populate('user', 'displayName').exec(function(err, objects) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(objects);
		}
	});
};

/**
 * Object middleware
 */
exports.objectByID = function(req, res, next, id) { Object.findById(id).populate('user', 'displayName').exec(function(err, object) {
		if (err) return next(err);
		if (! object) return next(new Error('Failed to load Object ' + id));
		req.object = object ;
		next();
	});
};

/**
 * Object authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.object.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};