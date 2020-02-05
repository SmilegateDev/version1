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
      return res.redirect(200, '/join');
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


router.post('/login_test', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash('loginError', info.message);
      return res.redirect(400, '/');
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect(200, '/');
    });
    
    return res.status(200);

  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});


router.post('/token_test', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash('loginError', info.message);
      return res.redirect(400, '/');
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      try{
        const token = jwt.sign({
            id : user.id,
            nickname : user.nickname,
        },
        process.env.JWT_SECRET,
        {
            expiresIn : '1m',
            issuer : 'nodebird',
        }
        );
        return res.json({
            code : 200,
            message : '토큰이 발급되었습니다.',
            token,
        });
    }

    catch(error){
        console.error(error);
        return res.status(500).json({
            code : 500,
            messgae : '서버 에러',
        });
    }
    
    });
    
    return res.status(200);

  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});







module.exports = router;