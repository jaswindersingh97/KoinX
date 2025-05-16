const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const morgan = require("morgan");
app.use(express.json());
app.use(morgan("dev"));

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({message:"Internal Server error"});
});

const routes = require("./routes");
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server is running at:",port);
})