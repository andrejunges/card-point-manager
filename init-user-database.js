var mongoose = require('mongoose'),
    userSchema = require('./dev/models/user.js').Schema,
    password = require('password-hash-and-salt');

mongoose.connect('mongodb://localhost/cardpointmanager');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Yo the Con is now Open ');
    var userModel = mongoose.model('User', userSchema);

    password('admin').hash(function (error, hash) {
        if (error)
            throw new Error('Opps something wrog with crypto!');

        var admin = new userModel({
            Name: 'admin',
            Login: 'admin',
            Password: hash,
            Email: 'admin@admin'
        });
        admin.save(function (err, admin) {
            if (err) {
                throw new Error('Opps something went terribly wrong we can save a user!');
            }
            console.log('Dahh tan!! admin user, now can be used.');
            mongoose.connection.close(function () {
                console.log('The Con was kill!');
            });
        });
    });
});
