"use strict";
let mongoose = require('mongoose');
let movimentationSchema = mongoose.Schema({
    _id: String,
    Entry: Date,
    Exit: Date,
    Period: String,
    _idEployee: String
});
exports.name = 'movimentation';
exports.Schema = mongoose.model('Movimentation', movimentationSchema);
