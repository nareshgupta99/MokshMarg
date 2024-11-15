const express =require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose = require('mongoose');
const { isAuthenticated } = require("./config/security.config");


dotenv.config();


app.use(express.json()) 


const PORT = process.env.PORT || 8080;


app.get("/hi",isAuthenticated,(req,res)=>{
  res.send("hi")
})



app.use("/api/v1/user",require("./routes/User.routes"));

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

app.listen(PORT ,()=>{
    console.log(`server started on ${PORT}`);
})

