const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html");
})

app.post("/", function(req,res) {
    
    
    const query = req.body.cityName;
    const appKey = "936c02ec76527c5dd323b897b62541f5";
    const units = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?units="+units+"&q="+query+"&appid="+appKey;
    
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            
            res.write("<p> the weather is currently  " + description + "</p>");
            res.write("<h1>The temperature in "+ query +" is: " + temp + " degrees fahrenheit</h1>"); 
            res.write("<img src =" + imageURL + ">");
            console.log(imageURL);
            res.send();

        })
    })
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
})


