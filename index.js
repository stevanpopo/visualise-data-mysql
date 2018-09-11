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

let keys;

app.get('/:cat', function (req, res) {
  if(req.params.cat === 'undefined'){
    console.log('no cat');
    // connection.query('SHOW COLUMNS FROM census_learn_sql', function (error, results, fields) {
    //   if (error) throw error;
    //   console.log(results);
    // });
    connection.query('SELECT * FROM census_learn_sql LIMIT 0,1', function (error, results, fields) {
      if (error) throw error;
      // console.log(results[0]);
      keys = Object.keys(results[0]);
      console.log(keys);
      res.json(keys);
    });
  } else {
    console.log('there is a cat', req.params.cat);
    // connection.query('SELECT `education`, COUNT(*) as count, AVG(age) as average_age FROM census_learn_sql GROUP BY `education`', function (error, results, fields) {
    const queryString = 'SELECT `'+req.params.cat+'`, COUNT(*) as count, AVG(age) as average_age FROM census_learn_sql GROUP BY `'+req.params.cat+'` ORDER BY COUNT(*) DESC LIMIT 100';
    console.log('queryString', queryString);
    connection.query(queryString, function (error, results, fields) {
      if (error) throw error;
      console.log(results);

      res.json(results);
    });
  }
});

app.listen(port, () => console.log(`Express running on port ${port}`));
module.exports = app;
