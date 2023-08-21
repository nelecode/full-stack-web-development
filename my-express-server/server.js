const express = require ("express");
const app = express();
app.get("/", function (req,res){
    res.send("<h1>hello world...</h1>")
})
app.get("/contact", function (req,res){
    res.send("<h1>contact me at naim@gmail.com</h1>")
})
app.get("/hobies", function (req,res){
    res.send("<h1>this is my hobbies</h1>")
})
app.listen(3000,function(){
    console.log("server started on port 3000");
});