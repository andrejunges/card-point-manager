var mongoose = require('mongoose');
mongoose.connect(framework.config.database);
global.genFind = function (){
     var self = this;
     return function (callback){
      self.find(callback);
    };
};
global.mongoose = mongoose;
