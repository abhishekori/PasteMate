var express = require('express');
var app=express();
var cors= require('cors');
var passwordHash = require('password-hash');
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
  content:String,
  pass:String

});
var pasteModel=mongoose.model('pastes',pasteSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// hi i am kljsdlkjdsl
function defaultData(content,type){
  var rContent=content;
var defaultContent;

  if(content=='')
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
  }else {
    return content;
  }
}

function isPasswordSet(input){
  if(input!=null)
  {
    //paste.isPassword=1;
    return passwordHash.generate(input);
  }
  //paste.isPassword=0;
  return null;
}

app.post('/save',function(req,res){

  var paste=new pasteModel();

  paste.subject= defaultData(req.body.subject,1);
  paste.content= defaultData(req.body.content,2);
  paste.pass=isPasswordSet(req.body.pass);

  paste.save(function(err,docs){
    if(!err)
    {
      console.log(docs);

      res.json({"response":docs._id});
    }else{
      res.json({"error":err});
    }

  });
});

app.get('/getIsPass/:id',function(req,res){
  console.log("getisPass");
  var isPass=1;
  pasteModel.find({"_id":req.params.id},function(err,docs){
console.log(docs[0].pass);
    if(docs[0].pass==null)
    {
      isPass=0;
    }

    res.json({"isPass":isPass});

  });
});


app.get('/get/:id',function(req,res){
  console.log("get");
  console.log(req.params.id);
  var paste = new pasteModel();

  pasteModel.find({'_id':req.params.id},function(err,docs){

    console.log(docs);

    res.json({"_id":docs[0]._id,"subject":docs[0].subject,"content":docs[0].content});
  });
});


app.post('/verifyPass',function(req,res){
  console.log(isPasswordSet(req.body.inputPass));

  pasteModel.find({"_id":req.body.id},function(err,docs){
    if(passwordHash.verify(req.body.inputPass,docs[0].pass)){
    console.log("true");
    res.json({"status":1,"message":docs[0]});
  }else{
res.json({"status":0,"message":"wrong password"});
  }
  });

});

app.post('/saveImg',function(req,res){
console.log(req.body.img);

res.send(req.body.img);
})
app.listen(3005);
