'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const ip = require('ip')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
})
