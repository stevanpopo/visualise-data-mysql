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
// Type: MySQL
// • Host:
// • Port: 3306
// • User: none
// • Password: none
// • Name: none --> db name
// • Table: census_learn_sql --> table to request

// console.log(connection);

app.use(express.static(`${__dirname}/public`));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res) {
  console.log('in the home backedn req');
  connection.connect();
  console.log('after connect');
  connection.query('SELECT * FROM census_learn_sql LIMIT 0, 2', function (error, results, fields) {
    console.log('in the query', results);
    console.log('res', res);
    if (error) throw error;
    res.json(results);
    console.log('end');
  });

  connection.end();
});



app.listen(port, () => console.log(`Express running on port ${port}`));
module.exports = app;
