import express, { Router } from 'express';
// import multer from 'multer';
import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs';
import Image from '../models/image';
import { getAll, getOld, getNew } from '../utils/getFunctions';


const admUploadRouter = Router();

admUploadRouter.use(express.static('uploads'));


admUploadRouter.route('/')

.get((req,res) => {

//  res.json({files:'upload router!'});
  getAll(req, res, Image, 2);
})

.post( function(req,res) {
  console.log('admupload');
  const dir = 'uploads';

  fs.readdir(dir, (err, files) => {
    if (err) {
      makeDir(req, res, dir);
    }
    else {
      uploadFiles(req,res, dir);
    }
  })
})


// ******** helper functions *************

// make directory 
function makeDir(req, res, dir) {
  fs.mkdir(dir, err => {
    if (err) {
      return console.log(err);
    }
    console.log('dir created!');
    uploadFiles(req, res, dir);
  })
}


// save files in file system
function uploadFiles(req, res, dir) {

  let form = new IncomingForm(),
      files = [],
      fields = [];

  form.uploadDir = dir;
  form.keepExtensions = true;

  form
    .on('field', (field,value) => {
      fields.push([field,value]); 
    })
    .on('file', (field, file) => {
      const imgPath = split(file.path);
      console.log(imgPath);
      saveImage({path:imgPath});
      files.push([field,file]);
    })
    .on('end', () => {
      res.json({success: 'images uploaded!'});
    })
    form.parse(req);
}

// save image path to db
function saveImage(data) {
  let content = new Image(data);
  content.save(err => {
    if (err) {
      return console.log(err)
    }
    console.log('success');
  })
}
// split path
function split(string) {
  let arr = string.split('/');
  return arr[1];
}


export default admUploadRouter;
