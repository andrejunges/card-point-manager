exports.install = function () {
    framework.route('/employee/new', json_get_new_employee, ['authorize']);
    framework.route('/employee/form', view_employee_form, ['authorize']);
    framework.route('/employees/fetch', json_get_employees, ['authorize']);
    framework.route('/employees', view_employees, ['authorize']);

    framework.route('/employees/{idEmployee}/tabletime', view_employee_tabletime, ['authorize']);
    framework.route('/employees/{idEmployee}/getemployeetabletime', json_get_employee_tabletime, ['authorize']);
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
    var employees =
        yield sync(global.genFind.call(employeeSchema))();
    self.json(employees);
}

function view_employee_tabletime() {
    this.layout(null);
    this.view('employee-tabletime');
}

function json_get_employee_tabletime(idEmployee) {
  var self = this,
      movimentationSchema = MODEL('movimentation').Schema;

  var movimentations = movimentationSchema.find({ _idEployee: idEmployee }).sort({ Entry: 1 }).exec(function(err, data){
    if (err) {
        console.log(err);
    }
    self.json(data, 23324);
  });
};

function json_get_new_employee() {
    var self = this;
    self.json({
        Name: '',
        Department: '',
        IdentificationNumber: ''
    });
}
