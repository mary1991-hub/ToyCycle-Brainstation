const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const jwt = require("jsonwebtoken");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const signupRouter = require("./routes/signup");
const offersRouter = require("./routes/offers");
const Users = require("./models/users");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

const jsonSecretKey = "secret";
function getToken(req) {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    return req.headers.authorization.split(" ")[1];
  } else {
    return null;
  }
}
app.use((req, res, next) => {
  const token = getToken(req);
  if (token) {
    console.log(token);
    if (jwt.verify(token, jsonSecretKey)) {
      req.authUser = jwt.decode(token);
      next();
    } else {
      res.status(403).json({ error: "Not Authorized." });
    }
  } else {
    next();
  }
});

app.use("/posts", postsRouter);
app.use("/signup", signupRouter);
app.use("/users", usersRouter);
app.use("/offers", offersRouter);

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  Users.where({ username: username })
    .fetch()
    .then((user) => {
      if (user && "" + user.get("password") === password) {
        res.json({
          token: jwt.sign(
            {
              name: user.get("name"),
              id: user.get("id"),
              username: user.get("username"),
            },
            jsonSecretKey
          ),
          user: user,
        });
      } else {
        res.json({
          token: "",
          user: null,
          error: {
            message: "Error logging in. Invalid username/password combination.",
          },
        });
      }
    })
    .catch((error) => {
      res.json({
        token: "",
        user: null,
        error: {
          message: "Error logging in. Invalid username/password combination.",
        },
      });
    });
});
app.get("/profile/:id", (req, res) => {
  Users.where({ id: req.params.id })
    .fetch({ withRelated: ["posts"] })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(400).json({ error: "No users with this ID" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
