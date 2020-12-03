const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var network = require('./fabric/network.js');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const PORT = 8080;
const HOST = 'localhost';



app.post('/initWallet', (req, res) => {
  
    network.initWallet(req.body.id)
    .then((response) => {
      res.send(response)
    })
  })  
  





app.post('/chargeMoney', (req, res) => {
  network.chargeMoney(req.body.id, req.body.amount)
      .then((response) => {
        res.send(response)
      })
})


app.post('/transferMoney', (req, res) => {
  network.transferMoney(req.body.sender,req.body.receiver, req.body.amount)
      .then((response) => {
        res.send(response)
      })
}
)

app.listen(PORT, HOST);
console.log('Running on http://'+HOST+':'+PORT);