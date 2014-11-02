'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Script Schema
 */
var ScriptSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Script name',
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

mongoose.model('Script', ScriptSchema);