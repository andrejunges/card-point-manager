"use strict";
//probably gonna nedd some changes
let mongoose = require('mongoose');
let departmentSchema = mongoose.Schema({
    Description: String
});
exports.name = 'department';
exports.Schema = mongoose.model('Department', departmentSchema);
