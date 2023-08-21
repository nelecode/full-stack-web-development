require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require('mongoose-encryption'); // no longer in use or no need of it
// const md5 = require("md5"); // also no need to use
// const bcrypt = require('bcrypt');
// const saltRounds = 10; //also no need to use

const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
}

const userSchema = new mongoose.Schema({
    email: "String",
    password: "String"
});

userSchema.plugin(passportLocalMongoose);

// userSchema.plugin(encrypt, { secret: process.env.SECRECT, encryptedFields: ['password'] }) // no longer in use

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
    res.render("home");
});
app.get("/login", function (req, res) {
    res.render("login");
});
app.get("/register", function (req, res) {
    res.render("register");
});
app.get("/secrets",function(res,req){
    if (req.isAuthenticated()){
        res.render("secrets");
    }else{
        res.redirect("/login");
    }
});
app.post("/register", function (req, res) {

    // bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {

    //     const newUser = new User({
    //         email: req.body.username,
    //         // password: md5(req.body.password) // hashing no need to use
    //         password: hash
    //     });

    //     try {
    //         await newUser.save();
    //         res.render("secrets")
    //     } catch (err) {
    //         console.log("error registering the user", err);
    //     }

    // });

    User.register({username: req.body.username}, req.body.password, function(err,user){
        if (err){
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            })
        }
    })


});
app.post("/login", async function (req, res) {
    // const userName = req.body.username
    // const password = md5(req.body.password)  // simple hashing
    // const password = req.body.password

    // try {
    //     const registeredUser = await User.findOne({ email: userName });
    //     if (registeredUser) {

    //         bcrypt.compare(password, registeredUser.password, function (err, result) {
    //             if (result === true) {
    //                 res.render("secrets")
    //             } else {
    //                 console.log("wrong password")
    //             }

    //         });

    // if (registeredUser.password === password) {
    //     res.render("secrets")
    // } else {

    //     console.log("password is wrong");
    // }
    //     } else {
    //         console.log("no such user exist");
    //     }
    // } catch (err) {
    //     console.log("error in finding data", err);
    // }


});



app.listen(3000, function () {
    console.log("App is running on port 3000");
});