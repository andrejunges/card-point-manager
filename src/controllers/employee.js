exports.install = function () {
    framework.route('/employee/new', json_get_new_employee, ['authorize']);
    framework.route('/employee/form', view_employee_form, ['authorize']);
    framework.route('/employees/fetch', json_get_employees, ['authorize']);
    framework.route('/employees', view_employees, ['authorize']);
};


function view_employees() {
    var self = this;
    self.layout(null);
    self.view('employees');
}

function view_employee_form() {
    this.layout(null);
    this.view('employee-form');
}

function* json_get_employees() {
    var self = this,
        employeeSchema = MODEL('employee').Schema;
    var emploees =
        yield sync(global.genFind.call(employeeSchema))();
    self.json(emploees);
}

function json_get_new_employee() {
    var self = this;
    self.json({
        Name: '',
        Department: '',
        IdentificationNumber: ''
    });
}
