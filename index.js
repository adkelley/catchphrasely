// index.js

// Requirements
var express = require("express"),
    app  = express(),
    path = require("path"),
    _    = require("underscore"),
    bodyParser = require("body-parser");

// Config

// body parser config
app.use(bodyParser({ extended: true }));

// serve js & css files into a public folder
console.log("__dirname: " + __dirname);
app.use(express.static("public"));

var views = path.join(process.cwd(), 'views');
console.log("views path: ", views);

// Data //
//A phrase object should have the properties: id, word, & definition
var phrases = [
  {id: 0, phrase: "word1", definition: "This is def1"},
  {id: 1, phrase: "word2", definition: "This is def2"},
  {id: 2, phrase: "word3", definition: "This is def3"}
];

// Routes

// root path
app.get("/", function(req, res) {
  var indexPath = path.join(views, 'index.html');
  console.log("Index.html path: ", indexPath);
  res.sendFile(indexPath);
});

app.get("/phrases", function(req, res) {
  res.send(phrases);
});

app.post("/phrases", function(req, res) {
  var phrase = req.body.phrases;
  console.log("phrase: ", phrase);
  phrase.id = phrases.length;
  phrases.push(phrase);
  res.send(phrase);
});

app.delete("/phrases/:id", function (req, res) {
  console.log("app.delete: ", req.params.id);
  phrases.splice(req.params.id);
  res.send(200);
});

app.listen(3000, function(req, res) {
  console.log("Ready on port 3000");
});





