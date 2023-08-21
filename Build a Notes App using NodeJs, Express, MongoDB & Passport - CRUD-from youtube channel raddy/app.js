require("dotenv").config();
const express = require("express")
const expressLayout = require("express-ejs-layouts")

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static files

app.use(express.static("public"));

//templating engine

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//Routes
app.use("/", require("./server/routes/index"))

app.listen(port, () => {
    console.log(`app is running on port localhost:${port}`)
})