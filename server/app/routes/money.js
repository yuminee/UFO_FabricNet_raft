const express = require('express');
const router = express.Router();
const money = require('../src/money')

module.exports = router

router.post('/chargeMoney', money.chargeMoney)
router.post('/transferMoney', money.transferMoney)


