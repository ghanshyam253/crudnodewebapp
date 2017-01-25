var express = require('express');
var models=require('./../custom_modules/mongoDB_connection');
var router = express.Router();
var path    = require("path");
/* GET users listing. */
router.get('/', function(req, res, next) {
     models.bookModel.find({},function(err,result)
   {
       if(err) throw err;
       result.message="success";
       result.modelName="bookModel";
       res.json(result);
//        res.send("<a href='/users'>Show Users</a>");
   });
});

router.get('/getBooks', function(req, res, next) {
     models.bookModel.find({},function(err,result)
   {
       if(err) throw err;
           result.message="success";
       res.json(result);
   });
});


router.get('/getBooks/:bookISBN', function(req, res, next) {
//      models.bookModel.find({ isbn: req.params.bookISBN },function(err,result)
//    {
//        if(err) throw err;
//            result.message="success";
//        res.json(result[0]);
//    });

    models.bookModel.findOne({ isbn: req.params.bookISBN }, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//Update an existing book 
router.put("/updateBook/:isbn", function (req, res) {
    console.log(req);
    models.bookModel.findOne({ isbn: req.params.isbn },
     function (err, result) {
        if (err) throw err;
        if (!result) {
            res.json({
                message: "Book with ISBN: " + req.params.isbn + " not found.",
            });
        }

        result.amount = req.body.amount; 
        result.author = req.body.author; 
        result.isFree = req.body.isFree; 
        result.isbn = req.body.isbn;
        result.name = req.body.name; 
        result.pages = req.body.pages; 
        result.publishedDate = req.body.publishedDate;

        result.save(function (err, result) {
            if (err) throw err;
            res.json({
                message: "Successfully updated the book", book: result
            });
        });
    });
}); 

// router.get('/deleteBookDetails', function(req, res, next) {
//     console.log("bookID");
//      res.json("result");
// //      models.bookModel.find({},function(err,result){

// //    });
// });

// router.get('/deleteBookDetail/:bookISBN',function(req, res) {
//     console.log(req.params.bookISBN);

//     models.bookModel.findOne({ isbn: req.params.bookISBN }, function (err, result) {
//         if (err) throw err;
//         res.json(result);
//     });

//     });


router.delete('/deleteBookDetail/:isbn', function (req, res) {
    console.log(req.params.isbn);
    models.bookModel.findOneAndRemove({ isbn: req.params.isbn }, 
    function (err, result) {
        res.json({
            message: "Successfully deleted the book",
            book: result
        });
    });
});

// router.delete('/deleteBookDetail/:bookID',function(req, res) {
//     console.log(req.params.bookID);

//     models.bookModel.findOne({ _id: req.params.bookID }, function (err, result) {
//         if (err) throw err;
//         res.json(result);
//     });


// //     res.json({ message: 'Successfully deleted '+req.params.bookID});
// //     var response = {};
//         // models.bookModel.findById(req.params.bookID,function(err,data){
//         // // This will run Mongo Query to fetch data based on ID.
//         //     if(err) {
//         //         response = {"error" : true,"message" : "Error fetching data"};
//         //     } else {
//         //         response = {"error" : false,"message" : data};
//         //     }
//         //     res.json(response);
//         // });

// //              models.bookModel.find({_id:"58763006e750181abc61063d"},function(err,result)
// //    {
// //        if(err) throw err;
// //        result.message="success";
// //        result.modelName="bookModel";
// //        res.json(result);
// // //        res.send("<a href='/users'>Show Users</a>");
// //    });
//         //  models.bookModel.remove({
//         //     _id:  req.params.bookID
//         // }, function(err, bear) {
//         //     if (err)
//         //         res.send(err);

//         //     res.json({ message: 'Successfully deleted' });
//         // });
//     });

/* GET users listing. */
router.get('/loadbooks', function(req, res, next) {
//    res.sendFile('loadb.html');
//    res.sendFile(path.join(__dirname+'/loadb.html'));
    res.sendFile(path.join(__dirname+'./../public/html/appIndex.html'));
//    res.sendFile("appIndex.html");
});



//Add a new book
router.post("/addBook", function (req, res) {
    console.log("Adding new Book: " + req.body.name);
    var book = new models.bookModel(
        {
            // name: req.body.name, 
            // isbn: req.body.isbn, 
            // author: req.body.author, 
            // pages: req.body.pages
            name:req.body.name,
            isbn:req.body.isbn,
            author:req.body.author,
            pages:req.body.pages,
            isFree:req.body.isFree,
            amount:req.body.amount,
            publishedDate:req.body.publishedDate
        });

    //Saving the model instance to the DB
    book.save(function (err, result) {
        if (err) throw err;
        res.json({
            message: "Successfully added the Book!", book: result
        });
    });
});




module.exports = router;


// app.get('/users/:email', function (req, res) {
//     if (req.params.email) {
//         User.find({ email: req.params.email }, function (err, docs) {
//             res.json(docs);
//         });
//     }
// });


// router.route("/users/:id")
//     .get(function(req,res){
//         var response = {};
//         mongoOp.findById(req.params.id,function(err,data){
//         // This will run Mongo Query to fetch data based on ID.
//             if(err) {
//                 response = {"error" : true,"message" : "Error fetching data"};
//             } else {
//                 response = {"error" : false,"message" : data};
//             }
//             res.json(response);
//         });
//     })



// router.route("/users/:id")
//     .get(function(req,res){
//         -------------------------------
//     })
//     .put(function(req,res){
//         var response = {};
//         // first find out record exists or not
//         // if it does then update the record
//         mongoOp.findById(req.params.id,function(err,data){
//             if(err) {
//                 response = {"error" : true,"message" : "Error fetching data"};
//             } else {
//             // we got data from Mongo.
//             // change it accordingly.
//                 if(req.body.userEmail !== undefined) {
//                     // case where email needs to be updated.
//                     data.userEmail = req.body.userEmail;
//                 }
//                 if(req.body.userPassword !== undefined) {
//                     // case where password needs to be updated
//                     data.userPassword = req.body.userPassword;
//                 }
//                 // save the data
//                 data.save(function(err){
//                     if(err) {
//                         response = {"error" : true,"message" : "Error updating data"};
//                     } else {
//                         response = {"error" : false,"message" : "Data is updated for "+req.params.id};
//                     }
//                     res.json(response);
//                 })
//             }
//         });
//     })



// delete 

    // .delete(function(req,res){
    //     var response = {};
    //     // find the data
    //     mongoOp.findById(req.params.id,function(err,data){
    //         if(err) {
    //             response = {"error" : true,"message" : "Error fetching data"};
    //         } else {
    //             // data exists, remove it.
    //             mongoOp.remove({_id : req.params.id},function(err){
    //                 if(err) {
    //                     response = {"error" : true,"message" : "Error deleting data"};
    //                 } else {
    //                     response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
    //                 }
    //                 res.json(response);
    //             });
    //         }
    //     });
    // })


    // .delete(function(req, res) {
    //     Bear.remove({
    //         _id: req.params.bear_id
    //     }, function(err, bear) {
    //         if (err)
    //             res.send(err);

    //         res.json({ message: 'Successfully deleted' });
    //     });
    // });