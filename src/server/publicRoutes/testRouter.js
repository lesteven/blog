var express = require('express');
var testRouter = express.Router();

testRouter.route('/')

.get(function(req,res) {
  res.json({success:'hello there'})
})
  

  

module.exports = testRouter;
