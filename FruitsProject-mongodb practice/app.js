const mongoose = require("mongoose");


async function dbConnection() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");
}

dbConnection();

// .then(res => console.log(res))
// .catch(err => console.log(err));

// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');
// }


const fruitsSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 5,
    review: "pretty solid as a fruit"
});

// fruit.save();

// const pineapple = new Fruit({
//     name: "pineapple",
//     rating: 9,
//     review: "great taste"
// });

// async function pinesave(){
// await pineapple.save();
// }

// pinesave();

const mango = new Fruit({
    name: "mango",
    rating: 100,
    review: "great taste"
});

async function mangsave(){
await mango.save();
}

// mangsave();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitsSchema
});

const Person = mongoose.model("Person",personSchema);



// const person = new Person({
//     name:"jameel",
//     age:30,
//     favouriteFruit: pineapple
// });


// const person = new Person({
//     name:"naim",
//     age:30
// });

// async function persave(){
// await person.save();
// }

// persave();



const kiwi = new Fruit({
    name: "kiwi",
    rating: 10,
    review: "good fuirt"
});
const orange = new Fruit({
    name: "orange",
    rating: 10,
    review: "good fuirt"
});
const banana = new Fruit({
    // name: "banana",
    rating: 10,
    review: "good fuirt"
});

// Fruit.insertMany([kiwi,orange,banana]);


// fruits();
// // close();

// async function fruits() {

//     const myFruits = await Fruit.find();
//     //  console.log(myFruits);
//     myFruits.forEach(function (item) {
//         console.log(item.name);
//     });

//     async function close() {
//         await mongoose.connection.close();
//     }
  
// }
// async function upp(){
// await Fruit.updateOne({_id:"645cdee32083369f8fb72e6a"},{$set:{name:"banana"}});
// await Fruit.deleteOne({_id:"645cdee32083369f8fb72e69"});
// }
// upp();
async function upp(){
await Person.updateOne({_id:"645b887952650bc1cb787678"},{$set:{favouriteFruit:mango}});
// await Fruit.deleteOne({_id:"645cdee32083369f8fb72e69"});
}
upp();
