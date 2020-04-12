var mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/db_name';
  // const uri = 'mongodb+srv://sebastian:TYsFwUVJFyqiann3@cluster0-cd2im.mongodb.net/survey';

  module.exports = () => {
    mongoose.set('useUnifiedTopology', true);
    return mongoose.connect(uri,{useNewUrlParser: true})  
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
  };