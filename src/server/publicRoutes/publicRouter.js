const express = require('express');

const publicRouter = express.Router();


// public routes
const authRouter = require('./authRouter');
const lockedRouter = require('./lockedRouter');


publicRouter.use('/auth', authRouter);
publicRouter.use('/locked', lockedRouter);


module.exports = publicRouter;
