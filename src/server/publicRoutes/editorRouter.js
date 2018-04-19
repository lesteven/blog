var express = require('express');
var editorRouter = express.Router();
var Editor = require('../models/editor');
var get = require('../utils/getFunctions');
const num = 3;

editorRouter.route('/:id')

.get(function(req,res){	
    console.log(' ******** editor router visited!');
    console.log(req.query);
    if(req.query.new){
      console.log('new');
      get.getNew(req,res,Editor, num);
    }
    else if(req.query.old){
      console.log('old');
      get.getOld(req,res,Editor, num);
    }
    else{
      console.log('not new or old');
      get.getAll(req,res,Editor, num)
    }
})


module.exports = editorRouter;
