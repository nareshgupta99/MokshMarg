const express =require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose = require('mongoose');
const { isAuthenticated } = require("./config/security.config");
const cors = require('cors');
const morgan = require('morgan');



dotenv.config();
app.use(morgan('combined'));
app.use(cors());


app.use(express.json()) ;


const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;


app.get("/api/v1/hi",(req,res)=>{
  res.send({
    message:"Hello World",
    token:"fgfdfgfgddf:jdfhdghfgdh:mdjshgdhsgh",
    status:200
  }).status(200);
})



app.use("/api/v1/user",require("./routes/User.routes"));
app.use("/api/v1/hotel",require("./routes/Hotel.routes"));
app.use("/api/v1/temple",require("./routes/Temple.routes"));
app.use("/api/v1/guide",require("./routes/Guide.routes"));



mongoose.connect("mongodb://localhost:27017/mokshMarg")
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err));

app.listen(PORT ,()=>{
    console.log(`server started on ${PORT}`);
})

