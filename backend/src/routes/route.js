const express = require('express')
const authRoute = require('./api/auth');
const route = express.Router()

route.use('/auth', authRoute);

module.exports=route