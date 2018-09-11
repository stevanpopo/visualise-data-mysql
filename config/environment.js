const port = process.env.PORT || 4000;
const dbUser = process.env.MYSQL_DB_USER;
const dbPass = process.env.MYSQL_DB_PASS;
const dbName = process.env.MYSQL_DB_NAME;
const dbHost = process.env.MYSQL_DB_HOST;

module.exports = { port, dbUser, dbPass, dbName, dbHost };
