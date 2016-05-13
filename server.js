var express = require('express');
var app=express();

var bodyParser=require('body-parser');
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/paste');
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
  console.log("db connected");
});

var pasteSchema=mongoose.Schema({
  subject: String,
  content:String
});
var pasteModel=mongoose.model('pastes',pasteSchema);

//var paste=new pasteModel({subject:"My bio data",content:"i am a nice boy"});
var paste=new pasteModel()
paste.subject="i am good boy";
paste.content="i am nice person";
paste.save(function(err,docs,numaf){
  console.log(err);
  console.log(docs);
  console.log(numaf);

});
//app.listen(3005);
