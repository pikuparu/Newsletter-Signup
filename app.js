require('dotenv').config();
const express=require("express");
var bodyParser=require("body-parser");
const axios = require("axios");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){

res.sendFile(__dirname + "/signup.html");

});

app.post("/",function(req,res){
   var firstName=req.body.fName;
   var secondName=req.body.lName;
   var email=req.body.email;
   var data={

      members:[{
        email_address: email,
        status:"subscribed",
        merge_fields:{
         FNAME:firstName,
         LNAME: secondName
}

       }]

};
    const jsonData=JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/a20481022c";
    const options={
 
    auth:{

      username: "paru",
      password:  process.env.MAILCHIMP_API_KEY
},
     
     
}
 axios.post(url,jsonData,options)
.then(function(response){
    console.log(response.data);
     res.sendFile(__dirname + "/success.html"); 
})
  .catch(function(error) {
    console.log("Error:" , error.response.data);
    res.sendFile(__dirname + "/failure.html");
}); 

 
});

app.post("/failure",function(req,res){
   res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){

console.log("Server started at port 3000");
});