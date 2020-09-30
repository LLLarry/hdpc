'use strict'
// const path = require('path')
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// const hdConfig= require(path.resolve(__dirname,'../hd.config'))

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // hdConfig: JSON.stringify(hdConfig)
})
