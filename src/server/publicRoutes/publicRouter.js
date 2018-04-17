const express = require('express');
const publicRouter = express.Router();


// public routes
// import testRouter from './testRouter';
const authRouter = require('./authRouter');
const lockedRouter = require('./lockedRouter');
const editorRouter = require('./editorRouter');


publicRouter.use('/auth', authRouter);
publicRouter.use('/locked', lockedRouter);
publicRouter.use('/editor', editorRouter);



module.exports = publicRouter;
