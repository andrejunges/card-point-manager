var mongoose = require('mongoose'),
    userSchema = require('./dev/models/employee.js').Schema,
    movimentationSchema = require('./dev/models/movimentation.js').Schema;


mongoose.connect('mongodb://localhost/cardpointmanager');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Yo the Con is now Open ');
    var employeeModel = mongoose.model('Employee', userSchema),
        movimentationModel = mongoose.model('Movimentation', movimentationSchema),
        employeeQueue = employeeModel.find();

    for (var i = 0, leng = employeeQueue.length; i < leng; i++) {
        var employee = employeeQueue[i],
            idEmployee = employee._id,
            lastDayMonth = global.UtilsCpm.getLastDayMonth();

        for (var j = 1; j < lastDayMonth; j++) {


            movimentation = new movimentationModel({
                _id: mockID,
                _idEployee: idEmployee,
                Name: 'Employee' + i,
                Entry: new Date(lastDayMonth.getFullYear(), lastDayMonth.getMonth(), j),
                Exit: new Date(lastDayMonth.getFullYear(), lastDayMonth.getMonth(), j + 1)
            });

            movimentation.save(function (err) {
                if (err) {
                    throw new Error('Opps something went terribly wrong we can save a employee!');
                }
            });
        }
    }
});
