const fabric = require('./fabric')
const models = require('../../database')

exports.chargeMoney = (req, res) => {
    models.User.findOne({
        where: {
            kakao_id: req.body.id
        }
    }).then(result => {
        let ca_id = result.dataValues.customer_id

        fabric.chargeMoney(ca_id, req.body.amount).then(result => {
            res.send(result)
        })
        
    }).catch(err => {
        console.log(err)
        res.send(false)
    })
}

exports.transferMoney = (req, res) => {

    models.User.findAll({
        where: {
            kakao_id: [req.body.sender, req.body.receiver]
        }
    }).then(result => {
        let sender = result[0].dataValues.customer_id
        let receiver = result[1].dataValues.customer_id
        fabric.transferMoney(sender, receiver, req.body.amount).then(response => {
            console.log(response)
            res.send(true)
        })
       
    }).catch(err => {
        console.log(err)
        res.send(false)
    })
}