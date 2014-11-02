'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Object Schema
 */
var ObjectSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Object name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Object', ObjectSchema);