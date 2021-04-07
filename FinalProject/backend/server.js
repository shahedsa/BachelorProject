var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
  host: 'mysql-ait.stud.idi.ntnu.no',
  user: 'shahedsa',
  password: 'q1lSARr0',
  database: 'shahedsa',
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});

con.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('connected');
  }
});
// dette endpunktet er bare for å teste serveren
app.get('/test', (req, res) => {
  res.send('test');
});
//dette endpunktet for å hente beacons via id
app.get('/Beacons/:id', (req, res) => {
  con.query('Select * from Beacons where id=?', [req.params.id], function (
    error,
    rows,
    fields,
  ) {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});
