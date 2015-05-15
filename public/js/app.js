// app.js

// Wait for window to load
$(function() {
  var $newPhrase = $("#newPhrase");
  var $phrasesCon = $("#phrasesCon");
  var phrases = [];
  var phraseTempl = _.template($("#phraseTempl").html());
  
  $.get("/phrases").
    done( function (phrases) {
      _(phrases).each(function (phrase) {
        console.log("phrase: ", phrase);
        var $phrase = $(phraseTempl(phrase));
        $phrase.data("id", phrase.id);
        console.log($phrase.data());
        $phrasesCon.append($phrase);
      });
    });

  // Wait for new #newPhrase submit
  $newPhrase.on("submit", function (e) {
    // prevent page from reloading
    e.preventDefault();

    // turn form data into a string we can use
    var phraseData = $newPhrase.serialize();
    console.log("phraseData: ", phraseData);

    $.post("/phrases", phraseData).
      done(function (data) {
        console.log(data);
        // reset the form
        $newPhrase[0].reset();
        // extra the values
        var $phrase = $(phraseTempl(data));

        // add id to $phrases
        $phrase.data("id", data.id);
        $phrasesCon.append($phrase);
        phrases.push(data);
      });

  });

  $phrasesCon.on("click", ".phraseCon .delete", function (e) {
    var $phrase = $(this).closest(".phraseCon");
    var id = $phrase.data("id");
    console.log("DELETE", id);
    $.ajax({
      url: "/phrases/" + id,
      type: "DELETE"
    }).done(function () {
      $phrase.remove();
    });
  });

});
