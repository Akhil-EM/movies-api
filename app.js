const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const appConfig = require("./config/app.config");
const dbConfig = require("./config/db.config");
const statusCode = require("./util/status-codes");
const response = require("./models/api/response.model");
const port = appConfig.port;
const environment = appConfig.environment;
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan(environment=="development"?"dev":"tiny"));

mongoose
  .connect(dbConfig.dbConnectionString,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4 })
  .then(() => {
    console.log("db connection success...");
  })
  .catch((err) => {
    console.log("db connection error" + err);
  });


app.get("/",(req,res)=>{
    res.status(statusCode.OK)
       .json(response("success","at application base"))
})

//routes 
app.use("/movies",require("./routes/movie.route"));


// error catching route
app.all("*",(req,res)=>{
    res.status(statusCode.NOT_FOUND)
       .json(response("failed","requested resource not found in this server"));
})


app.listen(port,()=>console.log(`application running on ${port}`));

