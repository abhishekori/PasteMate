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


function defaultData(content,type){
  var rContent=content;
var defaultContent;

  if(rContent==null)
  {
    switch (type) {
      case 1:
      defaultContent="Untitled Subject";

        break;

        case 2:
        defaultContent="No body content saved";
        break;
      default:

    }
return defaultContent;


  }

  return defaultContent;



}
app.post('/save',function(req,res){

  var paste=new pasteModel();

  paste.subject=defaultData(req.body.subject,1);
  paste.content=defaultData(req.body.content,2);
  paste.save(function(err,docs){
    if(!err)
    {
      console.log("saved");
      res.json({"response":docs._id});
    }else{
      res.json({"error":err});
    }

  });
});

app.get('/get/:id',function(req,res){
  console.log(req.params.id);
  var paste = new pasteModel();
  pasteModel.find({'_id':req.params.id},function(err,docs){
    //res.send(docs);
    console.log(docs);
    res.json(docs[0]);
  });
});
app.listen(3005);
