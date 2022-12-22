const bodyParser = require("body-parser");
const express=require("express");
const https=require("https");
const app= express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(rec,res){
    res.sendFile(__dirname+ "/index.html");
    

});
app.post("/",function(req,res){
        const query=req.body.cityname;
    const apikey="01df51861f515cea0202aea4521a6094"
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric"
https.get(url,function(response){
response.on("data",function(data){
    const weatherdata=JSON.parse(data)
    const temp=weatherdata.main.temp
    const des=weatherdata.weather[0].description
    // const icon=weatherdata.weather[0].icon
    res.write("<p>the weather is currently </p>"+des);
    res.write("<h1>the temprature in "+req.body.cityname+" is "+ temp+ " degrees celsius</h1>");
    res.send();
})
})
    console.log("request received");
})
app.listen(5500,function(){
    console.log("server is running on 3000.");
})