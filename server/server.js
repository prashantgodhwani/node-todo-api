var express = require('express');
var bodyParser = require('body-parser');

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



app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {app}
