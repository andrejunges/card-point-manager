'use strict';
//probably gonna nedd some changes
var mongoose = require('mongoose');
var employeeSchema = mongoose.Schema({
    Name: String,
    Department: String,
    IdentificationNumber: String,
    _IdDepartament: Number });
exports.name = 'employee';
exports.Schema = mongoose.model('Employee', employeeSchema);
