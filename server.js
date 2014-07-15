var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');

// Middleware
var logger = require('morgan');
var bodyParser = require('body-parser');

require('./models/post');
var posts = require('./controllers/posts');

// Defining Express Middleware
app.use(logger());
app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var notImplemented = function(req,res) {
  res.send(501)
}

mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

  // Posts
  app.get('/posts.json', posts.index);   // Read all (index action)
  app.get('/posts/new', notImplemented);
  app.get('/posts/:postId', notImplemented); // Read one (show action)
  app.post('/posts.json', posts.create);  // Create
  app.put('/posts/:postId', posts.update); // Update
  app.delete('/posts/:postId', notImplemented); // Destroy

  // Comments
  app.post('/posts/:postId/comments', notImplemented); 
  app.delete('/posts/:postId/comments/:commentId', notImplemented); 


  app.listen(port, function(err) {
    console.log("Sever started on %s", port);
  });
});
