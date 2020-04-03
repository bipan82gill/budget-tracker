const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect("mongodb://localhost/budget", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

//for heroku mLab
mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_szpf1gfd:no924vtcjqqjtqce1sn5e24vm8@ds119489.mlab.com:19489/heroku_szpf1gfd", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useMongoClient: true
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});