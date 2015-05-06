exports.install = function () {
    framework.route('/', view_logged, ['authorize']);
    framework.route('/', view_homepage);
    framework.route('/', json_homepage, ['xhr', 'post']);
    framework.route('/logout/', logout, ['authorize', 'get']);
};

var password = require('password-hash-and-salt');

function view_logged() {
    var self = this;
    //    self.view('login');
    //self.plain('You are logged as {0}. To unlogged remove cookie __user or click http://{1}:{2}/logout/'.format(self.user.email, framework.ip, framework.port));
    self.view('app');
}

function view_homepage() {
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
