const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
 app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res) {
  res.sendFile(__dirname+"/signup.html")
})
 app.post("/signup.html",function(req,res){
   const name = req.body.fname;
   const last_name = req.body.lname;
   const email = req.body.e;

  const data = {
    members : [
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME:name,
          LNAME:last_name
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);// this is to change the JS object to the JSON object

  const url = "https://us7.api.mailchimp.com/3.0/lists/6aa65e1d85";//server end point and list id

  const options ={
    method:"POST",
    auth:"Jatin:2462a0fc4ff4d0f602c180ef1e880338-us7"
  }

const request = https.request(url,options,function(response){

  if(response.statusCode === 200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");

  }
  response.on("data",function (data) {
  console.log(JSON.parse(data));
 });
});

request.write(jsonData);
request.end();

 });

 app.post("/failure.html",function (req,res) {
   res.redirect("/");
 });


 app.listen(process.env.PORT || 3000,function () {
   console.log("The app is running");
 });
//api key
// list id
