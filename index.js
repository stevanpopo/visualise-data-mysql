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

app.get('/:cat', function (req, res) {
  console.log('ids', req.params.cat);
  connection.query(`SELECT ${req.params.cat}, COUNT(*) as count, AVG(age) as average FROM census_learn_sql GROUP BY ${req.params.cat}`, function (error, results, fields) {
    if (error) throw error;
    console.log(results);

    res.json(results);
  });
});

app.listen(port, () => console.log(`Express running on port ${port}`));
module.exports = app;
