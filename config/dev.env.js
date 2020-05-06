'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  EVN_NAME: '"dev"',
  API_HOST: '"http://localhost:8080/"',
  HOST: 'http://localhost:8000'
})
