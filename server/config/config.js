var env = process.env.NODE_ENV || 'development';
console.log(env+"*************");
if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/todos';
}else if(env === 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/todosTest';
}else{
  process.env.MONGODB_URI = 'mongodb://nodedb:hcm780m@ds151282.mlab.com:51282/nodedb';
}
