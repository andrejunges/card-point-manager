'use strict';

var marked0$0 = [json_get_employees].map(regeneratorRuntime.mark);
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
    self.layout(null);
    self.view('employees');
}

/*
	Description: Get employees
	Method: GET
	Output: JSON
*/

function json_get_employees() {
    var self, employeeSchema, emploees;
    return regeneratorRuntime.wrap(function json_get_employees$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                self = this, employeeSchema = MODEL('employee').Schema;
                context$1$0.next = 3;
                return sync(global.genFind.call(employeeSchema))();

            case 3:
                emploees = context$1$0.sent;

                self.json(emploees);

            case 5:
            case 'end':
                return context$1$0.stop();
        }
    }, marked0$0[0], this);
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
