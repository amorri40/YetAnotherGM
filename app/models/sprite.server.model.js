'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sprite Schema
 */
var SpriteSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Sprite name',
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

mongoose.model('Sprite', SpriteSchema);