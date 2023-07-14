const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const option =  {
        method : "POST",
        auth : "Sachin:753f0e2576268d47816b2a52c30a5848-us14"
    }
    const url = "https://us14.api.mailchimp.com/3.0//lists/be6bfc051a";
    const request = https.request(url, option, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){ // To get back or to see data
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server Started at Port 3000");
});

// 753f0e2576268d47816b2a52c30a5848-us14
// be6bfc051a