const express = require("express");
const app = express();
const path = require('path');
const cors=require ('cors');
const fileUpload = require('express-fileupload');
const bodyParser=require("body-parser");
const PORT = process.env.PORT || 8080;
const jwt= require ("jsonwebtoken")
const usersRouter=require('./routes/users');
const postsRouter=require('./routes/posts');
const signupRouter=require('./routes/signup');
const Users = require("./models/users");



app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/users',usersRouter);
app.use('/posts',postsRouter);
app.use('/signup',signupRouter);
// app.use('/profile/:id',signupRouter.profile);


const jsonSecretKey = "secret";
app.use((req, res, next) => {
  if (req.url === "/signup" || req.url === "/login") next();
  else {
    const token = getToken(req);
    console.log(typeof token);
    if (token) {
      console.log(token);
      if (jwt.verify(token, jsonSecretKey)) {
        req.decode = jwt.decode(token);
        next();
      } else {
        res.status(403).json({ error: "Not Authorized." });
      }
    } else {
      res.status(403).json({ error: "No token. Unauthorized." });
    }
  }
});

function getToken(req) {
  return req.headers.authorization.split(" ")[1];
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = Users[username];
  if (user && user.password === password) {
    res.json({ token: jwt.sign({ name: user.name }, jsonSecretKey) });
  } else {
    res.json({
      token: "",
      error: {
        message: "Error logging in. Invalid username/password combination.",
      },
    });
  }
});
app.get("/profile", (req, res) => {
  res.json(req.decode);
});

app.listen(PORT,()=>{
  console.log(`Server is listening on ${PORT}`);
})
