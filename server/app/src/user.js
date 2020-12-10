const models = require('../../database')
const bcrypt = require('bcrypt')
const saltRounds = 12
const fabric = require('./fabric')

exports.getUser = (req, res) => {
    models.User.findAll({
        where: [],
        truncate: true
    }).then(result => {
        console.log(result)
        res.send(true)
    }).catch(err => {
        console.log(err)
        res.send(false)
    })
}

exports.signup = (req, res) => {
    let kakao_id = req.body.kakao_id
    let customer_id = kakao_id + "_c"

    models.User.findAndCountAll({
        where: {
            kakao_id: kakao_id
        },
    }).then(result => {

        if (result.count == 1) {
            console.log('There is same User')
            res.send(false)
            return
        }

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
                    res.send(true)

                }).catch(err => {
                    res.send(false)
                })
            })
        })

    }).catch(err => {
        console.log(err)
        res.send(false)
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

    }).catch(err => {
        console.log(err)
        res.send(false)
    })
}

exports.delete = (req, res) => {

    models.User.findOne({
        where: {
            kakao_id: req.body.kakao_id
        }
    }).then(result => {

        let customer_id = result.dataValues.customer_id

        fabric.deleteWallet(customer_id).then(response => {

            models.User.destroy({
                where: {
                    kakao_id: req.body.kakao_id
                }
            }).then(result => {
                console.log(result)
                res.send(true)
            }).catch(err => {
                console.log(err)
                res.send(false)
            })

        }).catch(err => {
            console.log(err)
            res.send(false)
        })

    }).catch(error => {
        console.log(error)
        res.send(false)
    })
}

exports.getBalance = (req, res) => {

    models.User.findOne({
        where: {
            kakao_id: req.params.id
        }
    }).then(result => {
        let ca_id = result.dataValues.customer_id

        fabric.getBalance(ca_id).then(result => {
            let jsonStr = Buffer.from(result).toString()
            let json = JSON.parse(jsonStr)

            res.json(json)
        }).catch(err => {
            console.log(err)
            res.send(false)
        })
    }).catch(err => {
        console.log(err)
        res.send(false)
    })
}

exports.getHistoryWallet = (req, res) => {

    models.User.findOne({
        where: {
            kakao_id: req.params.id
        }
    }).then(result => {
        let ca_id = result.dataValues.customer_id

        fabric.getHistoryWallet(ca_id).then(result => {

            data = []
            result.forEach(rs => {

                tmp = {}

                ts = rs.Timestamp.seconds.low
                date = new Date(ts * 1000)
                ndate = date.toLocaleString("ko-KR", {
                    timeZone: "Asia/Seoul"
                })

                tmp.date = ndate
                tmp.token = rs.Value.Token
                tmp.invoke = rs.Value.Invoke

                data.push(tmp)
            })

            res.json(data)
        }).catch(err => {
            console.log(err)
            res.send(false)
        })
    }).catch(err => {
        console.log(err)
        res.send(false)
    })


}