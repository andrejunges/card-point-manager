"use strict";
//probably gonna nedd some changes
let mongoose = require('mongoose');
let employeeSchema = mongoose.Schema({
    _id: String,
    Name: String,
    Department: String,
    IdentificationNumber: String,
    _IdDepartment: Number,
});
exports.name = 'employee';
exports.Schema = mongoose.model('Employee', employeeSchema);
