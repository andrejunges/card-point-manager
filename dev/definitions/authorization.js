// ================================================
// AUTHORIZATION
// ================================================

framework.onAuthorization = function (req, res, flags, callback) {
    var self = this,
        cookie = req.cookie(self.config.cookie);

    if (cookie === null || cookie.length < 10) {
        callback(false);
        return;
    }

    var obj = self.decrypt(cookie, 'user');

    if (obj === null || obj === '' || obj.ip !== req.ip) {
        callback(false);
        return;
    }

    var user = self.cache.read('user_' + obj.id);
    if (user !== null) {
        req.user = user;
        callback(true);
        return;
    }

    var UserSchema = MODEL('user').Schema;
    UserSchema.find({
        _id: obj.id
    }, function (err, users) {
        if (users.length === 0) {
            callback(false);
            return;
        }

        self.cache.add('user_' + users[0].id, users[0], new Date().add('h', 1));
        callback(true, user);
    });
};


framework.onValidation = function (name, value) {
    switch (name) {
        case 'LoginName':
            return utils.isEmail(value);
        case 'LoginPassword':
            return value.length > 0;
    };
}
