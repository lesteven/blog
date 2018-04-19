const express = require('express');
const publicRouter = express.Router();


// public routes
// import testRouter from './testRouter';
const authRouter = require('./authRouter');
const lockedRouter = require('./lockedRouter');
const editorRouter = require('./editorRouter');
const testRouter = require('./testRouter');

publicRouter.use('/auth', authRouter);
publicRouter.use('/locked', lockedRouter);
publicRouter.use('/editor', editorRouter);
publicRouter.use('/test', testRouter);



module.exports = publicRouter;
