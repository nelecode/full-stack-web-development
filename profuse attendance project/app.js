const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs")



const app = express()
const port = 3000

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/profuseUser');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
  cPassword: String
})
const User = new mongoose.model("User", userSchema)

const attandanceSchema = new mongoose.Schema({
  fullName: String,
  date: String,
  attandance: String
})
const Attandance = new mongoose.model("Attandance", attandanceSchema)

// home route log in page

app.get("/", function (req, res) {
  res.render("home", { err: "" })
})

// after log in secret/dash board page

app.post("/", async function (req, res) {

  function succ(pos){
    console.log(pos.coords.latitude)
    console.log(pos.coords.longitude)
  }

  function fail(){
    console.log("some err occured")
  }
  // navigator.geolocation.getCurrentPosition(succ,fail)
  if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(succ, fail);
} else {
    console.log('Geolocation is not available in this environment.');
}


  // const findUser = await User.findOne({ email: req.body.email });

  // if (!findUser) {
  //   res.render("home", { err: "Your are not registered? Kindly Register Yourself!" })
  // } else if (findUser.password != req.body.password) {
  //   res.render("home", { err: "Wrong Password" })
  // } else {
  //   const fullname = findUser.fName + " " + findUser.lName
  //   const findAttandance = await Attandance.find({ fullName: fullname });

  //   res.render("secret", { userData: findUser, attandanceData: findAttandance, attMsg: "" })
  // }
})

// attandance submission route

app.post("/submit", async function (req, res) {
  const findUser = await User.findOne({ _id: req.body.submit }) //userData from user db
  const fullname = findUser.fName + " " + findUser.lName   // userFullname
  const findAttandance = await Attandance.find({ fullName: fullname })
  const dt = new Date().toISOString().slice(0, 10)
  const todayAttandance = await Attandance.findOne({ fullName: fullname, date: dt })   //userAttandance
  const msg = "attandance already marked."
  if (todayAttandance) {
    res.render("secret", { userData: findUser, attandanceData: findAttandance, attMsg: msg })
  } else {
    const newAttandance = new Attandance({
      fullName: fullname,
      date: req.body.date,
      attandance: "present"
    })
    await newAttandance.save()
    const findAttandance = await Attandance.find({ fullName: fullname })
    res.render("secret", { userData: findUser, attandanceData: findAttandance, attMsg: "Attandance saved successfully" })
  }
})

// sign up route

app.get("/signup", function (req, res) {
  res.render("signup", { userMsg: "" })
})

// sign up registration route

app.post("/signup", async function (req, res) {
  // console.log(req.body.email)
  const newuser = await User.findOne({ email: req.body.email });
  // console.log(newUser)
  if (newuser) {
    res.render("signup", { userMsg: "User is already registered with this email Id" })
  } else {
    const newUser = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: req.body.password,
      cPassword: req.body.cPassword
    })
    await newUser.save();
    res.render("home",{err:"You have successfully registered! kindly log in"})
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})