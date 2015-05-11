exports.install = function () {
  framework.route('/employee/new', json_get_new_employee, ['authorize']);
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
  self.view('employees');
}

/*
	Description: Get employees
	Method: GET
	Output: JSON
*/

function json_get_employees() {
  var self = this,
    employeeSchema = MODEL('employee').Schema;

  employeeSchema.find(function (err, docs) {
      console.log(docs);
    self.json(docs);
  });
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
