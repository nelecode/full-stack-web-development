const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));

// getting-started.js

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/naimDB');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    // const personalSchema = new mongoose.Schema({
    //     name: String,
    //     age: Number
    // });

    // const Personal = mongoose.model('Personal', personalSchema);

    // const naim1 = new Personal({ name: 'naim ahmad', age: 555 });

    // await naim1.save();

    // const data = await Personal.find();
    // console.log(data);
}


const personalSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Personal = mongoose.model('Personal', personalSchema);

app.route("/articles")

    .get(async (req, res) => {

        try {

            const data = await Personal.find();
            res.send(data);
        }
        catch (err) {
            console.log("errer finding data", err)
        }
    })

    .post(async function (req, res) {

        const newPerson = new Personal({
            name: req.body.name,
            age: req.body.age
        });

        await newPerson.save();

    })

    .delete(async function (req, res) {
        await Personal.deleteMany();
    });

app.route("/articles/:articleTitle")
    .get(async function (req, res) {

        const onePerson = await Personal.findOne({ name: req.params.articleTitle });

        res.send(onePerson);
    })
    .put(async function (req, res) {
        // await Personal.update(
        //     {name:req.params.articleTitle},
        //     {name:req.body.name , age:req.body.age}
        // )

        // const query = { name: 'req.params.articleTitle' };
        await Personal.findOneAndUpdate(
            { name: req.params.articleTitle },
            { name: req.body.name, age: req.body.age })
    })
    .patch(async function (req, res) {
        // await Personal.update(
        //     {name:req.params.articleTitle},
        //     {name:req.body.name , age:req.body.age}
        // )

        // const query = { name: 'req.params.articleTitle' };
        await Personal.findOneAndUpdate(
            { name: req.params.articleTitle },
            { $set: { name: req.body.name } })
    })
    .delete(async function (req, res) {
        // await Personal.update(
        //     {name:req.params.articleTitle},
        //     {name:req.body.name , age:req.body.age}
        // )

        // const query = { name: 'req.params.articleTitle' };

        await Personal.deleteOne({ name: req.params.articleTitle });
        res.send("one item is deleted sucessfully.")
    });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});



