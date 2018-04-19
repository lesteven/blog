var express = require('express');
var testRouter = express.Router();

testRouter.route('/')

.get(function(req,res) {
  console.log('test router visited');
  console.log('tdata will be sent');
  res.json({success:'hello there'})
})
  

  

module.exports = testRouter;
