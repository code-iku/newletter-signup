const express = require('express');
const request = require('request');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res){

  res.sendFile(__dirname + "/signup.html");

});

app.get('/', function(req, res){

res.sendFile(__dirname+'/signup.html');

})


app.post('/',function(req, res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data ={

  members: [
  {
    email_address : email,
    status : "subscribed",
    merge_fields :
    {
      FNAME : firstName,
      LNAME : lastName
    }
  }
]
};

const jsonData = JSON.stringify(data);

const url = "https://us4.api.mailchimp.com/3.0/lists/0b73332415";
const options ={

  method : "POST",
  auth : "Triven:6a6ab61876571d73b7a59ea105e6998d-us4"
};

const request = https.request(url, options, function(response){
  response.on("data",function(data){

  var responseCode = response.statusCode;
    if(responseCode === 200){

      res.sendFile(__dirname + "/success.html");

    }else{

      res.sendFile(__dirname + "/failure.html");

    }

    console.log(JSON.parse(data));

  });

});

// request.write(jsonData);
request.end();

});


app.post("/failure",function(req, res){

console.log(req.body)
res.redirect("/")

});





app.listen( process.env.PORT || 3000, function(){

  console.log("Newsletter-Signup's server is started on port:3000.");
});



//API-Key

// 6a6ab61876571d73b7a59ea105e6998d-us4

//List-ID
// 0b73332415
