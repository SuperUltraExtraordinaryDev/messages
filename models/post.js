var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  name: String,
  title: String,
  message: String,
  createdAt: {type:Date, default: Date.now}
});

mongoose.model('post', PostSchema);
