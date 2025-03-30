const express = require('express');
const connectDB = require('./Database/DB-connection');
require("dotenv").config();
const cors = require('cors');
const session =require ("express-session");
const passport = require("passport");
const authRoute = require("./routes/auth")
const chatRoute = require("./routes/Chat");


const app = express()
connectDB();


app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/api", chatRoute);


app.get('/', (req, res) => {
  res.send('Hello, Devplex-AI!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
