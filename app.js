var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var models = require('./custom_modules/mongoDB_connection');

//console.log(models);
var app = express();

// Make our db accessible to our router
// app.use(function(req,res,next){
//     req.models = models;
//     next();
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname + 'View')));
// //Store all HTML files in view folder.
// app.use(express.static(path.join(__dirname + '/Scripts')));
// //Store all JS and CSS in Scripts folder.

//app.use('/', require('./routes/index'));
app.use('/', require('./routes/books'));
app.use('/projectName', require('./routes/rootRoute'));

// app.get('/books',function(req,res){
//    models.bookModel.find({},function(err,result)
//    {
//        if(err) throw err;
//        result.message="success";
//        res.json(result);
//    });
// });


//Add a new book
app.post("/book", function (req, res) {
    console.log("Adding new Book: " + req.body.name);
    var book = new Book(
        {
            name: req.body.name, 
            isbn: req.body.isbn, 
            author: req.body.author, 
            pages: req.body.pages
        });

    //Saving the model instance to the DB
    book.save(function (err, result) {
        if (err) throw err;
        res.json({
            message: "Successfully added the Book!", book: result
        });
    });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
