var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todos';
mongoose.connect(url);

module.exports = {
  mongoose
}
