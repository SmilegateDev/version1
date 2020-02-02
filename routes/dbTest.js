const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const url = require('url');

const { verifyToken, apiLimiter } = require('./middlewares');

const router = express.Router();

var User = require('../schemas/user');


/* GET users listing. */
router.get('/test', function(req, res, next) {
  User.find({})
    .then((users)=>{
      res.json(users);
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });

  //res.send('respond with a resource');
});


module.exports = router;

