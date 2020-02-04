const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nickname, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.redirect('/join');
    }
    let salt = Math.round((new Data().valueOf() * Math.random())) + "";
    //const hash = await bcrypt.hash(password, 12); //여기에 SALT를 써야함
    let hash = crypto.createHash("sha512").update(password + salt).digest("hex");
    await User.create({
      email,
      nickname,
      password: hash,
      salt : salt,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// router.post('/login', isNotLoggedIn, (req, res, next) => {
//   passport.authenticate('local', (authError, user, info) => {
//     if (authError) {
//       console.error(authError);
//       return next(authError);
//     }
//     if (!user) {
//       req.flash('loginError', info.message);
//       return res.redirect('/');
//     }
//     return req.login(user, (loginError) => {
//       if (loginError) {
//         console.error(loginError);
//         return next(loginError);
//       }
//       return res.redirect('/');
//     });
//   })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
// });


router.post('/login', isNotLoggedIn, (req, res, next) => {
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

      //로그인에 성공했으면 JWT 토큰 줘버리기
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


router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;