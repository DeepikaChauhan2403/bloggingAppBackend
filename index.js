const express = require("express");
require("dotenv").config();
const cors = require("cors");


//file imports
const db = require("./config/db");
const userRoutes = require("./routes/user"); // ***1***
const blogRoutes = require("./routes/blog");
const followRoutes = require("./routes/follow");
const { cleanUpBin } = require("./utils/cron");


const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(
    cors({
      origin: "*",
    })
  );

//routes
app.use("/user", userRoutes); // http://localhost:8001/user/register // ***2*** // if an api is hit with /user than it will be directed towards userRoutes // app.use makes it essacable 
app.use("/blog", blogRoutes); 
app.use("/follow", followRoutes);


app.listen(PORT, () => {
    console.log("Server is running at port:", PORT);
     cleanUpBin();
})