const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// var network = require('./fabric/network.js');
const { response } = require('express');
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use('/', require('./routes'))

module.exports = app

// app.listen(PORT, HOST);
// console.log('Running on http://'+HOST+':'+PORT);


// app.post('/initWallet', (req, res) => {
  
//     network.initWallet(req.body.id)
//     .then((response) => {
//       res.send(response)
//     })
//   })  
  
// app.post('/deleteWallet', (req, res) => {

//     network.deleteWallet(req.body.id)
//     .then((response) => {
//       res.send(response)
//     })
// })


// app.post('/getBalance', (req, res) => {

//   network.deleteWallet(req.body.id)
//   .then((response) => {
//     var walletToken = JSON.parse(response);        
//     res.send(walletToken)
//   })

// })

// app.post('/chargeMoney', (req, res) => {
//   network.chargeMoney(req.body.id, req.body.amount)
//       .then((response) => {
//         res.send(response)
//       })
// })


// app.post('/transferMoney', (req, res) => {
//   network.transferMoney(req.body.sender,req.body.receiver, req.body.amount)
//       .then((response) => {
//         res.send(response)
//       })
// }
// )

// app.post('/getHistoryWallet', (req,res) => {
//   network.getHistoryWallet(req.body.id)
//   .then((response) => {
//     var walltHistory = JSON.parse(response);        
//     res.send(Buffer.from(walltHistory).toString())
  
  
//   })

// })

