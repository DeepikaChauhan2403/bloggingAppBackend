const mongoose = require("mongoose");

// 2-connecting mongoDB
mongoose
.connect(process.env.MONGODB_URI)
.then(()=> console.log("MongoDB is connected"))
.catch((err)=> console.log(err));
 