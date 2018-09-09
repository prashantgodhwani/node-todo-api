const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todos', (err, client) => {

if(err){
  return console.log("Error in opening DB" + err);
}
  const db = client.db('todos');

  // db.collection('users').find({
  //   _id : new ObjectID('5b8b87021854962e5016604d')
  // }).toArray().then((docs) => {
  //   console.log('USERS');
  //   console.log(JSON.stringify(docs, undefined, 2));
  //
  // }, (err) => {
  //   return console.log("Error in fetching" + err);
  // });

  // db.collection('users').find().count().then((count) => {
  //   console.log(`Users count ${count}`);
  // }, (err) => {
  //   return console.log("Error in fetching" + err);
  // });

db.collection('users').find({
  fullname : 'Sameer Godhwani'
}).toArray().then((docs) => {
  console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
   return console.log("Error in fetching" + err);
 });


  client.close();
})
