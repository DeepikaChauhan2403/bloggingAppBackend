const express = require("express");
const { registerUser, loginUser, getAllUsers, profile } = require("../controllers/user.controllers");
const { isAuth } = require("../middlewares/AuthMiddleware");


const app = express();

app.post("/register", registerUser); //***3*** // if an api is hit with /user/register than it will be directed towards registerUser controllers 
app.post("/login", loginUser);
app.get("/profile",isAuth, profile );
app.get("/get-all-users", isAuth, getAllUsers);



module.exports = app;