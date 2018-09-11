const express = require('express');
const app = express();
const port = 4000;

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'none',
  user: 'none',
  password: 'none',
  database: 'none',
  multipleStatements: true
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
    // console.log('there is a cat', req.params.cat);
    const queryString = 'SELECT SQL_CALC_FOUND_ROWS `'+req.params.cat+'`, COUNT(*) as count, AVG(age) as average_age FROM census_learn_sql GROUP BY `'+req.params.cat+'` ORDER BY COUNT(*) DESC LIMIT 100 ; SELECT FOUND_ROWS()'
    // const queryString2 = 'SELECT FOUND_ROWS();'

    console.log('queryString', queryString);
    connection.query(queryString, [1,2], function (error, results, fields) {
      if (error) throw error;
      // console.log(results[0]);
      // console.log(results[1]);
      res.json({ data: results[0], rowsCount: results[1] });
    });

    // console.log(queryResult);
  }
});

app.listen(port, () => console.log(`Express running on port ${port}`));
module.exports = app;
