var express = require('express');
var app=express();
var cors= require('cors');
 app.use(cors());

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/save',function(req,res){

var paste=new pasteModel();
paste.subject=req.body.subject;
paste.content=req.body.content;
paste.save(function(err,docs){
  if(!err)
  {
    res.json({"response":docs});
  }else{
    res.json({"error":err});
  }

  });
});
app.listen(3005);
