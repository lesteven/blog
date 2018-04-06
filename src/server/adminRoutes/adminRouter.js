const express = require('express');
const adminRouter = express.Router();

adminRouter.route('/')

  .get((req,res) => {
    res.send('admin routes');
  })

export default adminRouter;
