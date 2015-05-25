"use strict";
//probably gonna nedd some changes
let mongoose = require('mongoose');
let configSchema = mongoose.Schema({
    DefaultEntry: Date,
    DefaultExit: Date,
    Period: String
});
exports.name = 'config';
exports.Schema = mongoose.model('Config', configSchema);
