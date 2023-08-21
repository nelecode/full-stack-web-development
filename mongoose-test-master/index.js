const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}


main()
    .then(res => console.log(res))
    .catch(err => console.log(err));



const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', async (req, res) => {

    const user1 = new User({
        email: req.body.email,
        password: req.body.password
    })

    await user1.save()

    // user.find().then((res)=>{
    //     console.log("data from database:", res)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })


    // user
    // app.redirect("/");

})


app.listen(3000, () => {
    console.log('app is running on 3000');
})