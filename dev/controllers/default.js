exports.install = function () {
    framework.route('/', view_logged, ['authorize']);
    framework.route('/', view_homepage);
    framework.route('/', json_homepage, ['xhr', 'post']);
    framework.route('/logout/', logout, ['authorize', 'get']);
};

function view_logged() {
    var self = this;
//    self.view('login');
    self.plain('You are logged as {0}. To unlogged remove cookie __user or click http://{1}:{2}/logout/'.format(self.user.email, framework.ip, framework.port));
}

function view_homepage() {
    var self = this;
    debugger
    self.view('login', {
        LoginName: ''
    });
}

function json_homepage() {
    var self = this,
        errorBuilder = self.validate(self.post, ['LoginName', 'LoginPassword']);

    debugger
    if (self.user !== null)
        errorBuilder.add('Logged');

    if (errorBuilder.hasError()) {
        self.json(errorBuilder);
        return;
    }

    var db = self.database('User');
    var filter = function (o) {
        return o.email === self.post.LoginName && o.password === self.post.LoginPassword;
    };

    db.one(filter, function (user) {

        if (user === null) {
            errorBuilder.add('LoginError');
            self.json(errorBuilder);
            return;
        }

        self.database('users-logs').insert({
            id: user.id,
            email: user.email,
            ip: self.req.ip,
            date: new Date()
        });

        // Save to cookie
        self.res.cookie(self.config.cookie, framework.encrypt({
            id: user.id,
            ip: self.req.ip
        }, 'user'), new Date().add('m', 5));

        // Return result
        self.json({
            r: true
        });
    });
}

function logout() {
    var self = this;
    self.res.cookie(self.config.cookie, '', new Date().add('y', -1));
    self.redirect('/');
}
