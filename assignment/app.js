var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/webdev';
if (process.env.MLAB_USERNAME) {
    connectionString = 'mongodb://' +
        process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@ds137141.mlab.com:37141/heroku_ml3v35nc";
}

mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');