const express = require('express')
const authRoute = require('./api/auth');
const adminRoute = require('./api/admin');
const productRoute = require('./api/product');
const route = express.Router()

route.use('/auth', authRoute);
route.use('/admin', adminRoute);
route.use('/product', productRoute);

module.exports=route