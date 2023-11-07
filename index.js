// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", function (req, res) {
  let unix = Date.now();
  let utc = new Date(unix).toUTCString();
  res.json({unix: unix, utc: utc});
});

app.get("/api/:date", (req, res) => {
  let str = req.params.date
  if ((/\d{5,}/).test(str)) {
    str = parseInt(str, 10)
  }
  console.log(str)
  let date = new Date(str)
  console.log(date)
  let timestamp = date.getTime();
  let utc = date.toUTCString();
  res.json({unix: timestamp, utc: utc});
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
