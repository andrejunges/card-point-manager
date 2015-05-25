"use strict";
let mongoose = require('mongoose');
let movimentationSchema = mongoose.Schema({
    Entry: Date,
    Exit: Date,
    Period: String,
    _idEployee: Number
});
exports.name = 'movimentation';
exports.Schema = mongoose.model('Movimentation', movimentationSchema);
