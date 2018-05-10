var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var server = app.listen("3000",function ( err ) {
  if (err) {
    console.log("Ikke muligt at oprette server");
  }
  console.log("Server er online på port " + server.address().port);

});
