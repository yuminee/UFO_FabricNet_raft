const models = require('../../database')
const bcrypt = require('bcrypt')
const saltRounds = 12
const fabric = require('./fabric')

exports.signup = (req, res) => {
    let kakao_id = req.body.kakao_id
    let customer_id = kakao_id + "_c"

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return res.send(false)

        bcrypt.hash(customer_id, salt, (err, hash) => {
            if (err) return res.send(false)

            models.User.create({
                kakao_id: kakao_id,
                customer_id: hash
            }).then(result => {
             
                fabric.initWallet(hash).then(response => {
                    console.log(response)
                    res.send(true)    
                }).catch(err => {
                    res.send(false)
                })
                
            }).catch(err => {
                res.send(false)
            })
        })
    })
}

exports.login = (req, res) => {
    //DB에 사용자가 있는지 
    let kakao_id = req.body.kakao_id

    models.User.findAndCountAll({
        where: {
            kakao_id: kakao_id
        },
    }).then(result => {    

        if (result.count == 0) {
            console.log('There is no User')
            res.send(false)
            return
        }

        res.send(true)

        // fabric.initWallet(hash).then(response => {
        //     console.log(response)
        //     res.send(true)    
        // }).catch(err => {
        //     res.send(false)
        // })
        
    }).catch(err => {
        console.log(err)
        res.send(false)
    })
}