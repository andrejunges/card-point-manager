'use strict';

var marked0$0 = [json_get_users].map(regeneratorRuntime.mark);
exports.install = function () {
    framework.route('/user/new', json_get_new_user, ['authorize']);
    framework.route('/user/save', json_save_user, ['authorize', 'json']);

    framework.route('/user/{id}', json_get_user, ['authorize', 'xhr', 'post']);
    framework.route('/users/fetch', json_get_users, ['authorize']);

    framework.route('/users', view_users, ['authorize']);
    framework.route('/users/form', view_user_form, ['authorize']);
};

var password = require('password-hash-and-salt');

/*
	Description: view users
	Method: GET
	Output: html
*/

function view_users() {
    var self = this;
    //same as partion view
    self.layout(null);
    self.view('users');
}

/*
	Description: view form user
	Method: GET
	Output: html
*/

function view_user_form() {
    this.layout(null);
    this.view('user-form');
}

/*
	Description: Get users
	Method: GET
	Output: JSON
*/

function json_get_users() {
    var self, UserSchema, users;
    return regeneratorRuntime.wrap(function json_get_users$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                self = this, UserSchema = MODEL('user').Schema;
                context$1$0.next = 3;
                return sync(global.genFind.call(UserSchema))();

            case 3:
                users = context$1$0.sent;

                self.json(users);

            case 5:
            case 'end':
                return context$1$0.stop();
        }
    }, marked0$0[0], this);
}

/*
	Description: get user
	Method: post
	Output: json
*/

function json_get_user(id) {
    var self = this,
        UserSchema = MODEL('user').Schema;
    UserSchema.find({
        _id: id
    }, function (err, doc) {
        if (err) {}
        self.json(doc);
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

/*
	Description: save user
	Method: post
	Output: JSON
*/

function json_save_user() {
    var self = this,
        userSchema = MODEL('user').Schema,
        userJson = this.body,
        userNew = new userSchema(userJson);

    password(userNew.Password).hash(function (error, hash) {
        userNew.Password = hash;
        if (error) {
            self.json(error);
        }
        userNew.save(function (err, user_db) {
            if (err) {
                self.json(err);
            }
            self.json(user_db);
        });
    });
};

//todo
