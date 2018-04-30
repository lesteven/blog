import { Router } from 'express';
import multer from 'multer';


const upload = multer({dest:'uploads/'});
const admUploadRouter = Router();

admUploadRouter.route('/')

.get((req,res) => {
  res.send('upload router!');
})

.post(upload.array('photos',3), function(req,res) {
  console.log('admupload');
//  console.log(req.file);
})

export default admUploadRouter;
