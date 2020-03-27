const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const app = express();
const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smartbrain"
  }
});

db.select("*")
  .from("users")
  .then(data => console.log(data));

app.use(bodyParser.json());
app.use(cors());
const saltRounds = 10;

app.get("/", (req, res) => {
  res.json("Its working...");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt, saltRounds);
});

app.get("/profiles/:id", (req, res) => {
  profile.handleProfile;
});

app.put("/image", (req, res) => {
  image.getImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res, db);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
