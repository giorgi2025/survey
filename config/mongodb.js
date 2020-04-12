var mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/db_name';

  module.exports = () => {
    mongoose.set('useUnifiedTopology', true);
    return mongoose.connect(uri,{useNewUrlParser: true})  
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
  };
