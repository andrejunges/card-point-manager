exports.install = function () {
  framework.route('/user/new', json_get_new_user, ['authorize']);
  framework.route('/users/fetch', json_get_users, ['authorize']);
  framework.route('/users', view_users, ['authorize']);
};

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
	Description: Get users
	Method: GET
	Output: JSON
*/

function* json_get_users() {
  var self = this,
    UserSchema = MODEL('user').Schema;
  var users = yield sync(global.genFind.call(UserSchema))();
  self.json(users);
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
