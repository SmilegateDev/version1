const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

<<<<<<< HEAD


const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

=======
>>>>>>> back-end1
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes');
const connect = require('./schemas');

//Test
const redis = require('./cache_redis');

const v1 = require('./routes/v1');
const v2 = require('./routes/v2');
const v4 = require('./routes/v4');
const test = require('./routes/test');

const app = express();
sequelize.sync(); // connect MySQL
connect(); //connect mongoDB
passportConfig(passport); //use passport module

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8002);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
<<<<<<< HEAD
app.use(cookieParser());

=======
app.use(cookieParser(process.env.COOKIE_SECRET));
>>>>>>> back-end1
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

<<<<<<< HEAD
app.use('/', pageRouter);
=======
app.use('/test',test);
app.use('/v1',v1);
app.use('/v2',v2);
<<<<<<< HEAD
>>>>>>> back-end1
=======
app.use('/v4',v4);
>>>>>>> back-end1
app.use('/auth', authRouter);
app.use('/', indexRouter);


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});


module.exports = app;
