const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
  {
    _id : new ObjectID(),
    text : "First test todo"
  },
  {
    _id : new ObjectID(),
    text : "Second test case"
  }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
  }).then(() => done());
});

describe('/POST todos', () => {
  it('should create a new todo', (done) => {
    var text = "should clear the test";
    request(app)
          .post('/todos')
          .send({text})
          .expect(200)
          .expect((res) => {
            expect(res.body.text).toBe(text)
          })
          .end((err, res) => {
            if(err){
              return done(err);
            }
            Todo.find({text}).then((todos) => {
              expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              done();
            }).catch((e) => done(e));
          });
  });
  it('should return an error for invalid todo', (done) => {
    request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
              if(err){
                done(err);
              }

              Todo.find().then((todos) => {
                  expect(todos.length).toBe(2);
                  done();
              }).catch((e) => done(e));
            });
      });
});

describe('/GET todos', () => {
    it('should get all todos', (done) => {
      request(app)
              .get('/todos')
              .expect(200)
              .expect((res) => {
                expect(res.body.todos.length).toBe(2);
              })
              .end((err) => {
                  done(err);
              });
    });
  });

describe('/GET todos/:id', () => {
    it('should get todo by :id', (done) => {
          request(app)
                 .get(`/todos/${todos[0]._id.toHexString()}`)
                 .expect(200)
                 .expect((res) => {
                   expect(res.body.todo.text).toBe(todos[0].text)
                 })
                 .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        request(app)
                .get(`/todos/${new ObjectID().toHexString()}`)
                .expect(404)
                .end(done)
    })

    it('should return a 404 if invalid ObjectID', (done) => {
        request(app)
                .get('/todos/123abc')
                .expect(404)
                .end(done);
    });
});


describe('/DELETE todos/:id', () => {
  it('should delete element with id', (done) => {
      request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
              expect(res.body.todo._id).toBe(todos[0]._id.toHexString());
            })
            .end((err, res) => {
              if(err){
                return done(err);
              }
              Todo.findById(todos[0]._id.toHexString()).then((todo) => {
                expect(todo).toBeFalsy();
                done();
              }).catch((e) => done(e));
            });
  });

  it('should return a 404 if todo not found', (done) => {
      request(app)
            .delete('/todos/5b95e020cc81ed3b94ef0cdf')
            .expect(404)
            .end(done);
  });

  it('should return a 404 if ObjectID is Invalid', (done) => {
      request(app)
            .delete('/todos/5b95e020cc')
            .expect(404)
            .end(done);
  });
});
