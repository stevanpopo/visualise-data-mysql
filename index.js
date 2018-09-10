const express = require('express');
const app = express();
const port = 4000;

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'none',
  user: 'none',
  password: 'none',
  database: 'none'
});

app.use(express.static(`${__dirname}/public`));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res) {
  connection.connect();
  connection.query('SELECT * FROM census_learn_sql LIMIT 0, 10', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.listen(port, () => console.log(`Express running on port ${port}`));
module.exports = app;
