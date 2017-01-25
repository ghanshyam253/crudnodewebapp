/*
 * Module: mongoDB_connection
 * Author: Ghanshyam Dhabale
 * Date: Wed, Jan 04, 2017
 * Description: Files contants the code for Local Mongo DB connection 
 * help: http://coursework.vschool.io/mongoose-crud/
 *        https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4 
 * http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
 * https://codeforgeek.com/2015/08/restful-api-node-mongodb/
 * https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications IMP
 * 
 */

// importing monggose module which installed previously using "npm install mongoose --save"
var mongoose = require('mongoose');

// // 127.0.0.1 ~ localhost
// // 27017 ~ port
// //nodetest1 ~ db_name which contains many collections
// var dbHost = 'mongodb://127.0.0.1:27017/nodetest1'; 

// // connecting to Mongo DB
// mongoose.connect(dbHost);

// // Create a book schema
// var bookSchema = mongoose.Schema({
//     name:String,
//     isbn:String,
//     author:String,
//     pages:String
// });


var dbHost = 'mongodb://127.0.0.1:27017/meandb'; 

// connecting to Mongo DB
mongoose.connect(dbHost);
//mongoose.createCollection("log", { capped : true, size : 5242880, max : 5000 } )
// Create a book schema
var bookSchema = mongoose.Schema({
    name:String,
    isbn:String,
    author:{ type: String, default: 'Unknnown' },
    pages:{ type: Number, default: 1000 },
    isFree:{ type: Boolean, default: true },
    amount:{ type: Number, default: 500 },
    publishedDate:{ type: Date, default: Date.now }
});

var schema= mongoose.Schema();
var models={};
models.bookModel = mongoose.model('Book',bookSchema);
models.usercollectionModel = mongoose.model('usercollection',schema);
models.usercollectionsModel = mongoose.model('usercollections',schema);
models.usersModel = mongoose.model('users',schema);

models.bookSchema=bookSchema;

module.exports = models;