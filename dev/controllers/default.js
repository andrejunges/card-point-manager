exports.install = function () {
    F.route('/', view_app);
    F.route('/login/', view_login);
};

function view_app() {
    var self = this;
    self.view('app');
}

function view_login() {
    var self = this;
    self.view('login');
}
