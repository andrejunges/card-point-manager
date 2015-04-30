"use strict";
let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    Name: String,
    Login: String,
    Password: String,
    Email: String,
    Created: Date
});
exports.name = 'user';
exports.Schema = mongoose.model('User', userSchema);
