const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html")
    

// res.send("server is up and running");
});

app.post("/",function(req,res){
    console.log();

    const query = req.body.cityName;
    const apiKey = "75055b0fda44a7575ab468ce26634c7c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey +""

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const wheatherdata = JSON.parse(data);
            // console.log(wheatherdata);
            const temp = wheatherdata.main.temp;
            // console.log(temp)

            const desc = wheatherdata.weather[0].description;
            // console.log(desc);
            const icon = wheatherdata.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/" + icon + ".png"
            res.write("<p>the weather is currently " + desc + " </p>");
            res.write("<h1>the temp. in "+ query +" is " + temp + " celcius</h1>");
            res.write("<img src="+imgUrl+">");
            res.send();
        });
    });
// console.log("post request is send sucssesfully");
})

// 





app.listen(3000,function(){
    console.log("server is ruuning on port 3000");
});