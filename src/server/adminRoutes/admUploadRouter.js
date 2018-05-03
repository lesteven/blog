import { Router } from 'express';
// import multer from 'multer';
import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs';


const admUploadRouter = Router();

admUploadRouter.route('/')

.get((req,res) => {
  res.send('upload router!');
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

function makeDir(req, res, dir) {
  fs.mkdir(dir, err => {
    if (err) {
      return console.log(err);
    }
    console.log('dir created!');
    uploadFiles(req, res, dir);
  })
}

function uploadFiles(req, res, dir) {

  let form = new IncomingForm(),
      files = [],
      fields = [];

  form.uploadDir = dir;
  form.keepExtensions = true;

  form
    .on('field', (field,value) => {
      console.log('field');
      // console.log(field, value);
      fields.push([field,value]); 
    })
    .on('file', (field, file) => {
      console.log('file');
      // console.log(field, file);
      files.push([field,file]);
    })
    .on('end', () => {
      console.log('upload done');      
      res.json({success: 'images uploaded!'});
    })
    form.parse(req);
}


export default admUploadRouter;
