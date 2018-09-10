var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const url = 'mongodb://nodedb:hcm780m@ds151282.mlab.com:51282/nodedb' || 'mongodb://127.0.0.1:27017/todos';
mongoose.connect(url);

module.exports = {
  mongoose
}
