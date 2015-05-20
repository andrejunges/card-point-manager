exports.install = function () {
    framework.route('/department/new', json_get_new_department, ['authorize']);
    framework.route('/department/form', view_department_form, ['authorize']);

    framework.route('/departments/fetch', json_get_departments, ['authorize']);
    framework.route('/departments', view_departments, ['authorize']);
};

/*
	Description: view department
	Method: GET
	Output: html
*/

function view_departments() {
    var self = this;
    //same as partion view
    self.layout(null);
    self.view('departments');
}

/*
	Description: view form department
	Method: GET
	Output: html
*/

function view_department_form() {
    this.layout(null);
    this.view('department-form');
}

/*
	Description: Get departments
	Method: GET
	Output: JSON
*/

function* json_get_departments() {
    var self = this,
        departmentSchema = MODEL('department').Schema,
        departments = yield sync(global.genFind.call(departmentSchema))();

    self.json(departments);
}
/*
	Description: Get new user
	Method: GET
	Output: JSON
*/
function json_get_new_department() {
    var self = this;
    self.json({
        Description: ''
    });
}
