var express = require("express");
app = express();
app.use(express.static("public"));


var ejs = require("ejs");

var mongoose = require("mongoose");

// app config
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));
mongoose.connect("mongodb://localhost:27017/BlogApp", { useNewUrlParser: true });

//mongoose config
var blogPostSchema = new mongoose.Schema({
    title : String,
    image : String,
    body : String,
    createdDate : {type :Date, default : Date.now}
});

var BlogPost = mongoose.model("BlogPost", blogPostSchema);

// BlogPost.create({title : "test blog", 
// image : "https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/Campground.webp",
// body : "sample post"}, function(err, post){

//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("created");
//     }
// });


//routes

app.get("/blogs", function(req, res){

});

app.listen(3000);