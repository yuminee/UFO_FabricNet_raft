const express = require('express')
const router = express.Router()
const models = require('../../database')

router.get('/', (req, res) => {
    models.User.findAll({

    }).then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err)
        res.json({ "result":"fail" })
    })
    
    // res.send('asd')
})

module.exports = router;