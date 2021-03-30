const express = require("express");
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const bodyParser=require("body-parser");
const PORT = process.env.PORT || 8080;
const jwt= require ("jsonwebtoken")
const usersRouter=require('./routes/users');
const postsRouter=require('./routes/posts');
const signupRouter=require('./routes/signup');


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

app.post('/login', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Login failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

app.listen(PORT,()=>{
  console.log(`Server is listening on ${PORT}`);
})
