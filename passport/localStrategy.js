const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email } });

      if (exUser) {
        if (password == exUser.password) {
          const result = true;
        } else {
          const result = false;
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }

      if (result) {
        done(null, exUser);
      } else {
        done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};