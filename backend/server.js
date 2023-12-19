const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const webRoutes = require("./src/routes/web");
const cors = require("cors");

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 8080;

const oneYear = 1000 * 60 * 60 * 3600;

const corsOptions = {
  origin: process.env.FEURL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "banhmihuit",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneYear },
  })
);

app.use("/api", webRoutes);
// mongoose.connect(url ,{dbName: 'QLBM'});
const url =
  process.env.DBURL ||
  "mongodb+srv://admin:123@qlbanmi.qonjmak.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(url, { dbName: "QLBM" })
  .then(() => {
    console.log("Connect Atlas successed!");
  })
  .catch((err) => {
    console.log(err);
  });
// app.listen(PORT, console.log(`Server started on port ${PORT}`));
