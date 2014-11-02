'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sound Schema
 */
var SoundSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Sound name',
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

mongoose.model('Sound', SoundSchema);