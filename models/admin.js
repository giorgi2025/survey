var mongoose = require('mongoose');


var AdminSchema = new mongoose.Schema({
    email: { type: String , required: true},
    password: { type: String , required: true},
}, {toJSON: { getters: true }} );


var Admin = mongoose.model('Admin', AdminSchema);
    

module.exports = Admin;


