const express = require('express');
const router = express.Router();
const user = require('../src/money')

module.exports = router

router.get('/chargeMoney', money.chargeMoney)
router.get('/transferMoney', money.transferMoney)


