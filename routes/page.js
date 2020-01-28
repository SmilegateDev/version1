const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title : '내 정보', uesr : req.user }); /* 여기 안에 있는 것들은 profile페이지에 넘겨줄 변수값들임 */
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title : '회원가입',
        user : req.user,
        joinError : req.flash('joinError') //이 모듈은 flash 라는 세션 객체 영역에 임시 메시지를 저장하게 만드는 노드 모듈이다.
    });
});

router.get('/', (req, res, next) => {
    res.render('main', {
        title: 'NodeBird',
        user : req.user,
        loginError : req.flash('loginError'),
    });
});

module.exports = router;