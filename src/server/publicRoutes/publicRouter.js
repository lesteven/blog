const express = require('express');
const publicRouter = express.Router();


// public routes
const authRouter = require('./authRouter');
const lockedRouter = require('./lockedRouter');
import testRouter from './testRouter';

publicRouter.use('/auth', authRouter);
publicRouter.use('/locked', lockedRouter);
publicRouter.use('/test', testRouter);



module.exports = publicRouter;
