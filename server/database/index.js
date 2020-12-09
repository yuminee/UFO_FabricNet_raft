'use strict';

const Sequelize = require('sequelize')
const config = require('../bin/config').db.development

const db = {}

var sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = require('./user')(sequelize, Sequelize)

module.exports = db
