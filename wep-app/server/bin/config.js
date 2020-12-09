const path = require('path')
const dotenv = require('dotenv')

var config = {}

dotenv.config({ path: path.join(__dirname, '.env') });
const env = process.env

web = {}
web.development = {}
web.development.port = env.PORT
web.development.host = env.HOST

db = {}
db.development = {}
db.development.username = env.DBUSERNAME
db.development.password = env.DBPASSWORD
db.development.database = env.DBDATABASE
db.development.host = env.DBHOST
db.development.port = env.DBPORT
db.development.dialect = env.DBDIALECT

config.web = web
config.db = db

module.exports = config