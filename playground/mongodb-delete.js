const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todos', (err, client) => {

  if(err){
    return console.log("Error in connecting " + err);
  }

  console.log("Connected to DB");
  const db = client.db('todos');

  // db.collection('users').deleteMany({
  //   fullname : 'Prashant Godhwani'
  // }).then((err, result) => {
  //   if(err){
  //     return console.log(err);
  //   }
  //   console.log(result);
  // });

  // db.collection('users').deleteOne({
  //   fullname : 'P Godhwani'
  // }).then((err, result) => {
  //   if(err){
  //     return console.log(err);
  //   }
  //   console.log(result);
  // });

  db.collection('users').findOneAndDelete({
    fullname : 'Sameer Godhwani'
  }).then((err, result) => {
    if(err){
      return console.log(err);
    }
    console.log(result, undefined, 2);
  });
});
