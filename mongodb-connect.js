const {MongoClient, ObjectID} = require('mongodb');

var objid = new ObjectID();

console.log(objid);

// MongoClient.connect('mongodb://localhost:27017/todos', (err, client) => {
//   if(err){
//     return console.log("Error" + err);
//   }
//
//   const db = client.db('todos');
//
//   db.collection('users').insertOne({
//     username : 'pra.godhwani',
//     fullname : 'P Godhwani',
//     email : 'pra.godhwani@gmail.com',
//     password : 'hcm780m'
//   }, (err, result) => {
//     if(err){
//       return console.log("Insertion Error" + err);
//     }
//     return console.log(result.ops, undefined, 2);
//   });
//
//   console.log(client);
//   console.log('Connected to DB');
//   client.close();
// });
