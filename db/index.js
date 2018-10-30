var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/pulsd"
var db = pgp(connectionString)

module.exports = db;