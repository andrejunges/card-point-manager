exports.install = function () {
    framework.route('/employee/new', json_get_new_employee, ['authorize']);
    framework.route('/employee/tabletime', view_employee_tabletime, ['authorize']);
    framework.route('/employees/fetch', json_get_employees, ['authorize']);
    framework.route('/employees', view_employees, ['authorize']);
};

/*
	Description: view employees
	Method: GET
	Output: html
*/
function view_employees() {
    var self = this;
    self.layout(null);
    self.view('employees');
}

/*
	Description: Get employees
	Method: GET
	Output: JSON
*/
function* json_get_employees() {
    var self = this,
        employeeSchema = MODEL('employee').Schema;
    var emploees =
        yield sync(global.genFind.call(employeeSchema))();
    self.json(emploees);
}


/*
	Description: Employee Tabletime
	Method: GET
	Output: View
*/
function view_employee_tabletime(idEmployee) {
    var self = this;
    //same as partion view
    self.layout(null);
    self.view('employee-tabletime');
}

/*
	Description: Get new user
	Method: GET
	Output: JSON
*/
function json_get_new_employee() {
    var self = this;
    self.json({
        Name: '',
        Department: '',
        IdentificationNumber: ''
    });
}
