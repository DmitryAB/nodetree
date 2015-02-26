global.__basedir = __dirname;

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

app = express();
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__basedir + '/public'));

app.get('/',function(req, res){
  res.render('index', {
     title: "Tree",
     tree: JSON.parse(fs.readFileSync(__basedir + '/tree.json', 'utf8'))
  });
});

app.post('/',function(req, res){
  
  fs.writeFile(__basedir + '/tree.json', JSON.stringify(req.body), function(err) {
      if(err) {
          console.log(err);
      } else {
          res.end("Saved!");
      }
  });
});

var server = app.listen(8000, function(){
  console.log('Server is listening on http://%s:%d', server.address().address, server.address().port);
});