const { text } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("index.html");
});

module.exports = router;
