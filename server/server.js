const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo  = new Todo({
    text : req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.status(200).send({todos})
  }, (e) => {
      res.status(400).send(e);
    });
  });

  app.get('/todos/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
      return res.status(404).send({'Error' : 'ObjectID Invalid.'});
    }
    Todo.findById(req.params.id).then((todo) => {
      if(!todo){
        return res.status(404).send({
          'Error' : 'ObjectID not found.'
        });
      }
      res.status(200).send({todo});
    }).catch((e) => res.status(400).send({'Error' : 'Error in finding todo.'}));
  });


  app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send({'Error' : 'ObjectID Invalid.'});
    }
    Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo){
        return res.status(404).send({'Error' : 'ObjectID not found.'});
      }
      return res.status(200).send({todo});
    }).catch((e) => res.status(400).send({'Error' : 'Error in finding todo.'}));
  });


  app.patch('/todos/:id', (req, res) => {
    var id  = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    console.log(body);
    if(!ObjectID.isValid(id)){
        return res.status(404).send({'Error' : 'ObjectID Invalid.'});
    }

    if(_.isBoolean(body.completed) && body.completed){
          body.completed_at = new Date().getTime();
      }else{
          body.completed_at = null;
          body.completed = false;
      }

      Todo.findByIdAndUpdate(id, {$set : body}, {new : true}).then((todo) => {
        if(!todo){
          return res.status(404).send({'Error' : 'ObjectID not found.'});
        }
          return res.status(200).send({todo});
      }).catch((e) => res.status(400).send({'Error' : 'Error in finding todo.'}));
  })



app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {app}
