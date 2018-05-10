var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = require("http").Server(app);
let io = require("socket.io")(server);

const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');
const knexConfig = require("./knexfile.js");
//Initialiserer et Knex object med den valgte database
const knex = Knex(knexConfig.development);
//kombineree knex med objection
Model.knex(knex);
//object til at håndtere alle modeller
const db =  {
  "users":require("./models/User.js")
};

server.listen("3000",function ( err ) {
  if (err) {
    console.log("Ikke muligt at oprette server");
  }
  console.log("Server er online på port " + server.address().port);

});

app.post("/login", function ( req, res) {
  db.users.query().select()
  .where({'username': req.body.username,'password': req.body.password})
  .then(users =>{
    let response = {};
    if (users.length == 0) {
      response.status = 500;
      response.error = "no user";
      res.json(response);
    }
    else {
    response.first = users[0].first;
    response.last = users[0].last;
    response.status = 200;
    response.user = users;
    res.json(response);
  };

});
});



app.post("/register", function ( req, res) {

  db.users.query().select()
  .where({'username': req.body.username})
  .then(users =>{
    let response = {};
    if (users.length == 0) {
      db.users.query().insert({
        "username": req.body.username,
        "password": req.body.password,
        "first" : req.body.first ,
        "last" : req.body.last
      })
      .then(persistedMessage => {
          response.status = 200;
          response.message = persistedMessage;
          res.json(response);
        })
        .catch( err => {
          response.status = 500;
          res.json(response);
        });
      }
});
});


var messages = [];

app.get("/messages", function ( req, res) {
  res.send(messages);
})


io.on("connection", (socket) => {
    console.log("A client connected!");

    socket.on("chat", function(data) {
        var sender = data.sender;
        var message = data.message;

        if (messages.length <= 3) {
          messages.push("<b>"+sender + "</b>:  " + message);
          console.log(messages);
        }
        else {
          for (var i = 1; i < messages.length ; i++) {
            messages[i-1] = messages[i];
          }
          messages.push("<b>"+sender + "</b>:  " + message);
          console.log(messages);
        }

        io.emit("chat-message", {"sender" : sender , "message": message});

    })
});
