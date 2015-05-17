// index.js

// Requirements
var express = require("express"),
    app  = express(),
    path = require("path"),
    _    = require("underscore"),
    bodyParser = require("body-parser"),
    db = require("./models");

// Config

// body parser config
app.use(bodyParser({ extended: true }));

// serve js & css files into a public folder
console.log("__dirname: " + __dirname);
app.use(express.static("public"));

var views = path.join(process.cwd(), 'views');
console.log("views path: ", views);

// Routes

// root path
app.get("/", function(req, res) {
  var indexPath = path.join(views, 'index.html');
  console.log("Index.html path: ", indexPath);
  res.sendFile(indexPath);
});

app.post("/phrases", function(req, res) {
  db.Phrase.create(req.body.phrases,
                   function(err, phrase) {
                     res.send(201, phrase);
                   });
});

app.get("/phrases", function(req, res) {
  db.Phrase.find({}, 
                 function(err, phrases) {
                   res.send(phrases);
                 });
});

app.delete("/phrases/:_id", function (req, res) {
  console.log("app.delete: ", req.params._id);
  db.Phrase.findOneAndRemove({ 
    _id: req.params._id
  }, function (err) {   
    res.send(204); // success no content    
  }); 
});

app.listen(3000, function(req, res) {
  console.log("Ready on port 3000");
});





