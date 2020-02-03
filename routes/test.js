const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const url = require('url');
const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { verifyToken, apiLimiter } = require('./middlewares');
const { User } = require('../models');
var mongoUser = require('../schemas/user');
const router = express.Router();



//Mongo DB test
router.get('/mongo_test', function(req, res, next) {
  mongoUser.find({})
    .then((users)=>{
      res.send(200);
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });
});

router.post('/join_test', isNotLoggedIn, async (req, res, next) => {
  const { uid, nickname, password } = req.body;
  console.log("debug");
  try {
    const exUser = await User.findOne({ where: { uid } });
    if (exUser) {
      req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.redirect('/join');
    }
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    //const hash = await bcrypt.hash(password, 12); //여기에 SALT를 써야함
    let hash = crypto.createHash("sha512").update(password + salt).digest("hex");
    await User.create({
      uid,
      nickname,
      password: hash,
      salt : salt,
    });
    res.json({
      code : 200,
      uid,
      nickname,
      password,
      hash,
      salt,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});



module.exports = router;