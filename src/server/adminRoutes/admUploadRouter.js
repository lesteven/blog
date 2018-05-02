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
      console.log(err);
    }
    uploadFiles(req,res, dir);
    
  })
})
function uploadFiles(req, res, dir) {

  let form = new IncomingForm(),
      files = [],
      fields = [];

//  console.log(path.resolve('/uploads'));
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
      
    })
    form.parse(req);

}
export default admUploadRouter;
