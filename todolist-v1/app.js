const express = require ("express");
const bodyParser = require("body-parser");
// const getDate = require("./date");
const date = require(__dirname + "/date.js");


const app = express();

var items=["Buy Food","Cook Food","Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){

    
    let day = date.getDay();

    // if(today.getDay()===6 || today.getDay()===0){
    //     day = "weekend";
    // }else{
    //     day ="weekday";
    // }
    // res.render("list",{kindofday:day});

    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday";
            
    //         break;
    //     case 1:
    //         day = "Monday";
            
    //         break;
    //     case 2:
    //         day = "Tuesday";
            
    //         break;
    //     case 3:
    //         day = "Wednesday";
            
    //         break;
    //     case 4:
    //         day = "Thursday";
            
    //         break;
    //     case 5:
    //         day = "Friday";
            
    //         break;
    //     case 6:
    //         day = "Saturday";
            
    //         break;
    
    //     default:
    //         console.log("Error:The day is equal to : " + today);
            
    // }

    res.render("list",{listTitle:day, newListItems:items});
    
});

app.post("/",function(req,res){
    console.log(req.body);
// res.send("Item added Successfully");
let item = req.body.newItem;

if (req.body.list==="Work"){
    workItems.push(item);
    res.redirect("/work");
}else{
    items.push(item);
    res.redirect("/");
}



// console.log(req.body.newItem);
// console.log(item);
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List", newListItems:workItems});
});

// app.post("/work",function(req,res){
//     let item = req.body.newItem
//     workItems.push(item);
//     res.redirect("/work");
// });


app.get("/about",function(req,res){
    res.render("about");
});


app.listen(3000,function(){
    console.log("app running on port 3000");
});
