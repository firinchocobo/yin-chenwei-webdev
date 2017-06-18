var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},//String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.ObjectId, ref: 'WebsiteModel'}],
    dateCreated: {type: Date, default: Date.now},
    facebook: {id: String, token: String},
    google: {id: String, token: String},
    role: {type: String, default: 'USER', enum: ['USER', 'ADMIN']}
    // a user could have different roles
    // roles: [{type: String, default: 'USER', enum: ['USER', 'ADMIN']}]
    // need to specify the roles when create the user, default is []

}, {collection: 'user'});

//if require from outside, get this instance
module.exports = userSchema;
