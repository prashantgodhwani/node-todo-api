const {ObjectID} = require('mongodb');

const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {mongoose} = require('./../server/db/mongoose');

var id = "5b8bf1ef4237ed294425a08b11";

if(!ObjectID.isValid(id)){
  return console.log("ObjectID is invalid");
}

User.findById(id).then((todo) => {
  if(!todo){
    return console.log("No todos with this found.")
  }
  console.log(JSON.stringify(todo, undefined, 2));
}).catch((e) => console.log(e));
