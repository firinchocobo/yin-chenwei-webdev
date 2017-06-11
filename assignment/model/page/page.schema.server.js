var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website : {type: mongoose.Schema.ObjectId, ref: 'WebsiteModel'},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.ObjectId, ref: 'WidgetModel'}],
    created: {type: Date, default: Date.now},
    accessed: {type: Date, default: Date.now}
}, {collection: 'page'});

module.exports = pageSchema;
