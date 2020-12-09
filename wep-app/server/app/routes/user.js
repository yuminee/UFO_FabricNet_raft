const express = require('express');
const router = express.Router();
const user = require('../src/user')

module.exports = router

router.post('/signup', user.signup)
router.post('/login', user.login)

// router.post('/login', user.login)
// router.get('/logout', user.logout)
// router.get('/islogin', user.islogin)
// router.post('/signup', user.signup)
// router.delete('/sigonut', user.sigonut)
// router.put('/update_transaction_pw', user.update_transaction_pw)
// router.post('/check_transaction_pw', user.check_transaction_pw)
// router.post('/update_sales', user.update_sales)
//router.get('/signup/check/:id', user.check)

