var express = require('express');
var models=require('./../custom_modules/mongoDB_connection');
var router = express.Router();

/* GET users listing. */
router.use('/users', require('./users'));
router.use('/books', require('./books'));
router.use('/usercollection', require('./usercollection'));
router.use('/usercollections', require('./usercollections'));

module.exports = router;
