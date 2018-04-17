const express = require('express');
const adminRouter = express.Router();
// routers
const admEditorRouter = require('./admEditorRouter.js');


adminRouter.use('/editor', admEditorRouter);


export default adminRouter;
