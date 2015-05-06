exports.install = function () {
    framework.route('/user/new', json_get_new_user);
    framework.route('/users', json_get_users);
};


/*
	Description: Get users
	Method: GET
	Output: JSON
*/

function json_get_users() {
    var self = this,
        UserSchema = MODEL('user').Schema;
    UserSchema.find(function (err, docs) {
        self.json(docs);
    });
}

/*
	Description: Get new user
	Method: GET
	Output: JSON
*/
function json_get_new_user() {
    var self = this;
    self.json({
        Name: '',
        Login: '',
        Password: '',
        Email: ''
    });
}
