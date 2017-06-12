var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true, unique: true},//String,
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.ObjectId, ref: 'WebsiteModel'}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'user'});

//if require from outside, get this instance
module.exports = userSchema;
