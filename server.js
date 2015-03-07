global.__basedir = __dirname;

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var Tree = mongoose.model('Tree', { tree: String });

mongoose.connect('mongodb://localhost/trees');

app = express();
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__basedir + '/public'));

app.get('/',function(req, res){

  Tree.findOne({},function(err,docs){
    res.render('index',{
      title: "Tree",
      tree: JSON.parse(docs ? docs.tree : "{\"name\":\"Древо\",\"nodes\":[]}")
    });
  });

});

app.post('/',function(req, res){
    
  Tree.remove({}, function(err) { 
    console.log('collection removed') 
  });
  var tree = new Tree({ tree: JSON.stringify(req.body) });
  tree.save(function (err) {
    if (err) 
      console.log(err);
    else
      res.end("Saved!");
  });
});

var server = app.listen(8000, function(){
  console.log('Server is listening on http://%s:%d', server.address().address, server.address().port);
});