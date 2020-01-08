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
app.get("/", function(req, res){
    res.redirect("/blogs");

});

//index route

app.get("/blogs", function(req, res){
BlogPost.find({}, function(err, posts){
    if(err){
        console.log(err);
    }
    else{
        res.render("index.ejs", {posts : posts});
    }
});
});

//new route

app.get("/blogs/new", function(req, res){
    res.render("new.ejs");
});

//create route, called within new route

app.post("/blogs", function(req, res){
    console.log(req.body.blog);
    BlogPost.create(req.body.blog, function(err, newPost){
        if(err){
            res.render("new.ejs");
        }
        else{
            console.log("created");
            res.redirect("/");
        }
    });

    
});


//show route, show one blog post

app.get("/blogs/:id", function(req, res){

    BlogPost.findById(req.params.id, function(err, foundBlog){

        if(err){
            res.redirect("/blogs");
        }

        else{
            res.render("show.ejs", {foundBlog : foundBlog});
        }
    });
});

app.listen(3000);