'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  EVN_NAME: '"dev"',
  API_HOST: '"http://192.168.101.12:8080/"',
  HOST: 'http://192.168.101.12:8000'
})
