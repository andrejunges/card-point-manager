"use strict";
//probably gonna nedd some changes
let mongoose = require('mongoose');
let employeeSchema = mongoose.Schema({
    Name: String,
    Departament: String,
    IdentificationNumber: String,
    _IdDepartament: Number,
});
exports.name = 'employee';
exports.Schema = mongoose.model('Employee', employeeSchema);