var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/launchPartner"
var db = pgp(connectionString)

module.exports = db;