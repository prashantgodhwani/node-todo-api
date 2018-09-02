const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todos', (err, client) => {

  if(err){
    return console.log("Error in connecting " + err);
  }

  console.log("Connected to DB");
  const db = client.db('todos');

  db.collection('users').findOneAndUpdate({
    _id : new ObjectID('5b8b87021854962e5016604d')
  }, {
    $set : {
      fullname : 'Praashant Godhwani'
    },
    $inc : {
      password : 1
    }
  }, {
    returnOriginal : false
  }).then((err, result) => {
    if(err){
      return console.log("Error in updating" + JSON.stringify(err, undefined, 2));
    }
    console.log(result, undefined, 2);
  })
});
