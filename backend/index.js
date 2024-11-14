const express =require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose = require('mongoose');

dotenv.config();

const PORT = process.env.PORT || 8080;




mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

app.listen(PORT ,()=>{
    console.log(`server started on ${PORT}`);
})

