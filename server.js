var express = require("express");
var sqlrest = require("./dest/index.js");
require('dotenv').config();
var app = express();

var router = sqlrest.getRouter({
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.envDB_DATABASE
});

app.use('/mydb', router);

app.listen(3000, function() {
    console.log("Listening on port 3000");
});