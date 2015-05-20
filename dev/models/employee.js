"use strict";
//probably gonna nedd some changes
let mongoose = require('mongoose');
let employeeSchema = mongoose.Schema({
    _id: String,//please use the IdentificationNumber
    Name: String,
    IdentificationNumber: String,
    _IdDepartament: Number,
});
exports.name = 'employee';
exports.Schema = mongoose.model('Employee', employeeSchema);
