'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Path = mongoose.model('Path'),
	_ = require('lodash');

/**
 * Create a Path
 */
exports.create = function(req, res) {
	var path = new Path(req.body);
	path.user = req.user;

	path.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(path);
		}
	});
};

/**
 * Show the current Path
 */
exports.read = function(req, res) {
	res.jsonp(req.path);
};

/**
 * Update a Path
 */
exports.update = function(req, res) {
	var path = req.path ;

	path = _.extend(path , req.body);

	path.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(path);
		}
	});
};

/**
 * Delete an Path
 */
exports.delete = function(req, res) {
	var path = req.path ;

	path.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(path);
		}
	});
};

/**
 * List of Paths
 */
exports.list = function(req, res) { Path.find().sort('-created').populate('user', 'displayName').exec(function(err, paths) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(paths);
		}
	});
};

/**
 * Path middleware
 */
exports.pathByID = function(req, res, next, id) { Path.findById(id).populate('user', 'displayName').exec(function(err, path) {
		if (err) return next(err);
		if (! path) return next(new Error('Failed to load Path ' + id));
		req.path = path ;
		next();
	});
};

/**
 * Path authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.path.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};