// server.js
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  res.json({
    unix: Math.floor(new Date().getTime()),
    utc: new Date().toUTCString()
  })
});

app.get("/api/:date", (req, res) => {
  let error = false;
  const formatDate = (date) => {
    let date1 = new Date(date);
    let formattedDate = date1 > 0 ? date1 : new Date(Number(date));
    error = formattedDate > 0 ? false : true;
    return formattedDate;
  };

  let utc = formatDate(req.params.date).toUTCString();
  let unix = formatDate(req.params.date).getTime();
  if(error) res.json({error: "Invalid Date"})
  res.json({unix, utc});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
