// model.js

// Requirements
var mongoose = require("mongoose");

// Config
mongoose.connect("mongodb://localhost/phrase_app");

var phraseSchema = new mongoose.Schema({
  phrase: { type: String,
            default: ""
          },
  definition: { type: String,
                default: ""
              }
});

var Phrase = mongoose.model("phrase", phraseSchema);

module.exports.Phrase = Phrase;
