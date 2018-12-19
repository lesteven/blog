var express = require('express');
var editorRouter = express.Router();
var Editor = require('../models/editor');
var crud = require('../utils/crudFunctions');
var get = require('../utils/getFunctions');

const items = 3;

editorRouter.route('/')

.post(function(req,res){
    crud.post(req,res,Editor);
})

.delete(function(req,res){
//    console.log('req.body', req.body);
//    get.renewContent(req,res, Editor);
    crud.delete(req, res, Editor, items, get.renewContent)
})

.put(function(req,res){
    const {_id,editor} = req.body;
    const query = {_id};
    const update = {editor};
    crud.put(res,Editor,query,update);
})


module.exports = editorRouter;
