const express = require('express');
const adminRouter = express.Router();
// routers
const admEditorRouter = require('./admEditorRouter.js');
import admUploadRouter from './admUploadRouter';


adminRouter.use('/editor', admEditorRouter);
adminRouter.use('/upload', admUploadRouter);


export default adminRouter;
