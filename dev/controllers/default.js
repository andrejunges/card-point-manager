exports.install = function () {
    framework.route('/', view_logged, ['authorize']);
    framework.route('/', view_log_in);
    framework.route('/', json_homepage, ['xhr', 'post']);
    framework.route('/logout/', logout, ['authorize', 'get']);
    framework.route('/home', view_home, ['authorize']);
};
var password = require('password-hash-and-salt');


function view_logged() {
    var self = this;
    self.view('app');
}

function view_home() {
    var self = this;
    self.view('home');
}

function view_log_in() {
    var self = this;
    self.view('login', {
        LoginName: ''
    });
}

function json_homepage() {
    var self = this,
        user = self.post.LoginName,
        pw = self.post.LoginPassword,
        UserSchema = MODEL('user').Schema;

    UserSchema.find({
        Login: user
    }, function (err, users) {
        password(pw).verifyAgainst(users[0].Password, function (error, verified) {
            if (verified) {
                console.log(users[0]._id);
                self.res.cookie(self.config.cookie, framework.encrypt({
                    id: users[0]._id,
                    ip: self.req.ip
                }, 'user'), new Date().add('h', 1));
                self.redirect('/');
            }
        })
    })
}

function logout() {
    var self = this;
    self.res.cookie(self.config.cookie, '', new Date().add('y', -1));
    self.redirect('/');
}
