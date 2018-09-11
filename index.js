const express = require('express');
const app = express();
const { port, dbUser, dbPass, dbName, dbHost } = require('./config/environment');

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbName,
  multipleStatements: true
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

let keys;

app.get('/:cat', function (req, res) {
  if(req.params.cat === 'undefined'){
    connection.query('SELECT * FROM census_learn_sql LIMIT 0,1', function (error, results, fields) {
      if (error) throw error;
      keys = Object.keys(results[0]);
      res.json(keys);
    });
  } else {
    const queryString = 'SELECT SQL_CALC_FOUND_ROWS `'+req.params.cat+'`, COUNT(*) as count, AVG(age) as averageAge FROM census_learn_sql GROUP BY `'+req.params.cat+'` ORDER BY COUNT(*) DESC LIMIT 100 ; SELECT FOUND_ROWS() as totalRows'

    connection.query(queryString, [1,2], function (error, results, fields) {
      if (error) throw error;
      res.json({ demographicData: results[0], rowsCount: results[1][0] });
    });
  }
});

app.use(express.static(`${__dirname}/public`));
app.get('/*',(req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express running on port ${port}`));
module.exports = app;
