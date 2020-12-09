const express = require('express');
const router = express.Router();
const user = require('../src/user')

module.exports = router

router.post('/', user.getUser)
router.post('/signup', user.signup)
router.post('/login', user.login)
router.delete('/', user.delete)
router.get('/getBalance/:id', user.getBalance)
router.get('/getHistoryWallet/:id', user.getHistoryWallet)
