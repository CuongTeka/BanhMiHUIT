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
const PORT = process.env.PORT || 8080;

const oneYear = 1000 * 60 * 60 * 3600;

const corsOptions = {
  origin: process.env.FEURL || "http://localhost:3000",
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
    cookie: { maxAge: oneYear, sameSite: "None", secure: true },
  })
);

app.use("/api", webRoutes);
// mongoose.connect(url ,{dbName: 'QLBM'});

mongoose
  .connect(`${process.env.DBURL}`, { dbName: `${process.env.MONGO_DB}` })
  .then(() => {
    console.log("Connect Atlas successed!");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
