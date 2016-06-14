var express = require('express');
var moment = require('moment');
var app = express();

var path = process.cwd();

app.get("/", function(request, response) {
  response.sendFile(path + '/index.html');
});

app.get("/:date", function(request, response) {
  if (/^\d{8,}$/.test(request.params.date)) {
    var myDate = moment(request.params.date, "X");
  } else {
    var myDate = moment(request.params.date, "MMMM D, YYYY");
  }

  if (myDate.isValid()) {
    response.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    response.json({
      unix: null,
      natural: null
    });
  }
});

app.get("*", function(request, response) {
  response.end("404!");
});

app.listen(8080);