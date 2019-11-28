const DB_NAME = 'chatbot'
var mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);
var dbconnection = function(name)
{
  var mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/' + (name ? name : DB_NAME)

  return mongoose.createConnection(mongoDB, { useNewUrlParser: true });
}

module.exports = dbconnection;
