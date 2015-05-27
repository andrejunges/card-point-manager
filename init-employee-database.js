var mongoose = require('mongoose'),
    userSchema = require('./dev/models/employee.js').Schema;


mongoose.connect('mongodb://localhost/cardpointmanager');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Yo the Con is now Open ');
    var employeeModel = mongoose.model('Employee', userSchema);

    for(var i = 0; i< 20; i++){
        var mockID = '23043232' + i;
        var employee = new employeeModel({
            _id: mockID,
            _IdDepartament: 1,
            Name: 'Employee' + i,
            IdentificationNumber: mockID
        });
        employee.save(function (err) {
            if (err) {
                console.log(err);
                throw new Error('Opps something went terribly wrong we can save a employee!');
            }
        });
    }
});
