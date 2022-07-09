
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true} ));
app.use(cors())
.use(cookieParser());

const AuthRoutes = require("./routes/authRoutes.js");
app.use("/", AuthRoutes);

app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})