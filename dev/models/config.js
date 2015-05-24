'use strict';
//probably gonna nedd some changes
var mongoose = require('mongoose');
var configSchema = mongoose.Schema({
    DefaultEntry: Date,
    DefaultExit: Date,
    Period: String
});
exports.name = 'config';
exports.Schema = mongoose.model('Config', configSchema);
