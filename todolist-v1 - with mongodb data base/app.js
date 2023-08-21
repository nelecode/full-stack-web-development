const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const getDate = require("./date");
// const date = require(__dirname + "/date.js");


const app = express();

// var items=["Buy Food","Cook Food","Eat Food"];
// let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function dbConnection() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
    }
    catch {
        console.log("error");
    }
}
dbConnection();


const todoSchema = {
    name: String
};

const Item = mongoose.model("Item", todoSchema);

const item1 = new Item({
    name: "Welcome to your todolist"
});
const item2 = new Item({
    name: "Hit the + button to add a new item"
});
const item3 = new Item({
    name: "<-- hit this to delete an item"
});

const defaultItems = [item1, item2, item3]

// Item.insertMany([item1,item2,item3]);

const urlSchema = {
    name: String,
    items: [todoSchema]
}

const Urlmodel = mongoose.model("Urlvalue", urlSchema);

app.get("/", function (req, res) {


    // let day = date.getDay();

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

    async function gettingData() {
        try {
            const data = await Item.find({});
            if (data.length === 0) {
                Item.insertMany(defaultItems);
            } else {
                res.render("list", { listTitle: "Today", newListItems: data });
            }
        }
        catch {
            console.log("error in finding data");
        }

    }
    gettingData();


});
app.post("/", function (req, res) {
    // console.log(req.body);
    // res.send("Item added Successfully");
    // let item = req.body.newItem;

    // if (req.body.list === "Work") {
    //     workItems.push(item);
    //     res.redirect("/work");
    // } else {
    //     items.push(item);
    //     res.redirect("/");
    // }


    let inputItem = req.body.newItem;

    const item = new Item({
        name: inputItem
    });

    async function saveNewItem() {
        try {
            await item.save();
        }
        catch {
            console.log("some error! new item is not added");
        }
    }

    saveNewItem();

    res.redirect("/");



    // console.log(req.body.newItem);
    // console.log(item);
});

app.post("/delete", function (req, res) {
    const value = req.body.checkbox
    // Item.deleteOne({ _id: value });

    async function upp() {
        try {
            // await Person.updateOne({_id:"645b887952650bc1cb787678"},{$set:{favouriteFruit:mango}});
            await Item.findByIdAndDelete({ _id: value });
        }
        catch {
            console.log("error deleting the item");
        }
    }
    upp();
    res.redirect("/");
});

// app.get("/work", function (req, res) {
//     res.render("list", { listTitle: "Work List", newListItems: workItems });
// });

// app.post("/work",function(req,res){
//     let item = req.body.newItem
//     workItems.push(item);
//     res.redirect("/work");
// });

app.get("/:urlvalue", function (req, res) {
    const urlvalue = req.params.urlvalue;


    const urlmodel = new Urlmodel({
        name: urlvalue,
        items: defaultItems
    });

    // console.log(req.params.urlvalue);

    // async function findingData() {
    //     try {
    //         const foundData = await Urlmodel.findOne({ name: "urlvalue" })
    //         if (!foundData) {
    //             // console.log("no value found");

    //             const urlmodel = new Urlmodel({
    //                 name: urlvalue,
    //                 items: defaultItems
    //             })
    //             async function saveurl() {
    //                 try {
    //                     await urlmodel.save();
    //                 }
    //                 catch {
    //                     console.log("some error! new item is not added");
    //                 }
    //             }

    //             saveurl();

    //         } else {
    //             // console.log("value found");
    //             res.render("list", { listTitle: urlvalue, newListItems: foundData.items })
    //         }
    //     }
    //     catch {
    //         console.log("error found");
    //     }
    // }
    // findingData();

    async function findingData() {
        try {
            const foundData = await Urlmodel.findOne({ name: "urlvalue" });
            if (foundData) {
                // const urlmodel = new Urlmodel({
                //     name: urlvalue,
                //     items: defaultItems
                // });

                // async function saveurl() {
                //     try {
                //         await urlmodel.save();
                //     } catch (error) {
                //         console.log("Error: New item is not added", error);
                //     }
                // }

                // await saveurl();

                res.render("list", { listTitle: urlvalue, newListItems: foundData.items });

            } else {
                async function saveurl() {
                        try {
                            await urlmodel.save();
                        } catch (error) {
                            console.log("Error: New item is not added", error);
                        }
                    }
    
                    await saveurl();
                res.render("list", { listTitle: urlvalue, newListItems: foundData.items });
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    findingData();


});


app.get("/about", function (req, res) {
    res.render("about");
});


app.listen(3000, function () {
    console.log("app running on port 3000");
});
