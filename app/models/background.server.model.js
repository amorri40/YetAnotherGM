'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Background Schema
 */
var BackgroundSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Background name',
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

mongoose.model('Background', BackgroundSchema);