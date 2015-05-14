var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    Name: String,
    Login: String,
    Password: String,
    Email: String,
    Created: {
        type: Date,
        default: Date.now
    }
});

exports.name = 'user';
exports.Schema = mongoose.model('User', userSchema);
