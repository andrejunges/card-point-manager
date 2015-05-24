"use strict";
//probably gonna nedd some changes
let mongoose = require('mongoose');
let typeDepartamentSchema = mongoose.Schema({
    _id: Number,
    Description: String
});
exports.name = 'typeDepartament';
exports.Schema = mongoose.model('TypeDepartament', typeDepartamentSchema);
