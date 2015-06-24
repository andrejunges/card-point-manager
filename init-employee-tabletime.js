var mongoose = require('mongoose'),
    userSchema = require('./dev/models/employee.js').Schema,
    movimentationSchema = require('./dev/models/movimentation.js').Schema,
    configSchema = require('./dev/models/config.js').Schema,
    utilsCpm = require('./dev/definitions/utils.js').UtilsCpm;


mongoose.connect('mongodb://localhost/cardpointmanager');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Yo the Con is now Open ');
  var employeeModel = mongoose.model('Employee', userSchema),
      configModel = mongoose.model('Config', configSchema),
      movimentationModel = mongoose.model('Movimentation', movimentationSchema);

  configModel.find(function(err, configQueue) {
    employeeModel.find(function (err, employeeQueue) {
      for (var i = 0, leng = employeeQueue.length; i < leng; i++) {
        var employee = employeeQueue[i],
            idEmployee = employee._id,
            ldMonth = utilsCpm.getLastDayMonth();

        for (var j = 1; j < ldMonth.getDate(); j++) {

          for (var k = 0; k < configQueue.length; k++){
            var config = configQueue[k];

            var movimentation = new movimentationModel({
              _idEployee: idEmployee,
              Name: 'Employee' + i,
              Entry: new Date(ldMonth.getFullYear(), ldMonth.getMonth(), j, config.DefaultEntry.getHours(), config.DefaultExit.getMinutes()),
              Exit: new Date(ldMonth.getFullYear(), ldMonth.getMonth(), j, config.DefaultExit.getHours(), config.DefaultExit.getMinutes())
            });

            movimentation.save(function (err, data) {
               console.log(data);
               if (err) {
                   throw new Error('Opps something went terribly wrong we can save a employee!');
               }
            });
          }
        }
      }
    });
  });
});
