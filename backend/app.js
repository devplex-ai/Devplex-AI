const express = require('express');
const connectDB = require('./Database/DB-connection');
require("dotenv").config();
const cors = require('cors');
const session =require ("express-session");
const passport = require("passport");
const authRoute = require("./routes/auth")
const chatRoute = require("./routes/Chat");
const deployRoute = require("./routes/deploy")


const app = express()
connectDB();


app.use(express.json());
const allowedOrigins = [
  "https://devplex-ai-sigma.vercel.app",
  "https://www.devplex.in",
  "https://devplex.in",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and authentication headers
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

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
app.use("/api", deployRoute);


app.get('/', (req, res) => {
  res.send('Hello, Devplex-AI!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
