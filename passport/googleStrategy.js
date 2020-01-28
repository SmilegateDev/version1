var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.findOne({ where: { email: profile._json.email, provider: profile.provider } });

      if (exUser) {
        done(null, exUser);
      }
      
      else {
        const newUser = await User.create({
          email: profile._json.email,
          provider: profile.provider,
        });

        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};