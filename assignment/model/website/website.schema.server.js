var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    //foreign key to refer back to the user
    _user: {type: mongoose.Schema.ObjectId, ref: 'UserModel'},
    name: {type: String, required: true},
    description: String,
    pages: [{type: mongoose.Schema.ObjectId, ref: 'PageModel'}],
    created: {type: Date, default: Date.now},
    accessed: {type: Date, default: Date.now}
}, {collection: 'website'});

module.exports = websiteSchema;
