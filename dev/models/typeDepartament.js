'use strict';
//probably gonna nedd some changes
var mongoose = require('mongoose');
var typeDepartamentSchema = mongoose.Schema({
    _id: Number,
    Description: String
});
exports.name = 'typeDepartament';
exports.Schema = mongoose.model('TypeDepartament', typeDepartamentSchema);
