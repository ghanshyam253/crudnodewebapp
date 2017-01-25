var express = require('express');
var models=require('./../custom_modules/mongoDB_connection');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
     models.usercollectionsModel.find({},function(err,result)
   {
       if(err) throw err;
       result.message="success";
       result.modelName="usercollectionsModel";
       res.json(result);
   });
});

module.exports = router;
