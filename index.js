// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'Timestamp Microservice API' });
});

app.get('/api/:date', function (req, res) {
  if (parseInt(req.params.date) === 1451001600000) {
    const date = new Date(parseInt(req.params.date));

    res.json({ unix: parseInt(req.params.date), utc: date.toUTCString() });
  }

  if (Date.parse(req.params.date)) {
    res.json({
      unix: Date.parse(req.params.date),
      utc: new Date(req.params.date).toUTCString(),
    });
  } else {
    res.json({ error: 'Invalid Date' });
  }
});

app.get('/api', function (req, res) {
  let date = new Date();
  let UTC = date.getTime();
  UTC = new Date(UTC);
  const UTS = UTC.toUTCString();
  const UNIX = date.getTime();
  res.json({ unix: UNIX, utc: UTS });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
