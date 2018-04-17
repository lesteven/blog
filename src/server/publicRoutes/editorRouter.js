var express = require('express');
var editorRouter = express.Router();
var Editor = require('../models/editor');
var get = require('../utils/getFunctions');
const num = 3;

editorRouter.route('/:id')

.get(function(req,res){	
    if(req.query.new){
      get.getNew(req,res,Editor, num);
    }
    else if(req.query.old){
      get.getOld(req,res,Editor, num);
    }
    else{
      get.getAll(req,res,Editor, num)
    }
})


module.exports = editorRouter;
