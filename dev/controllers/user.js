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
  console.log(self)
  self.view('users');
}

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
