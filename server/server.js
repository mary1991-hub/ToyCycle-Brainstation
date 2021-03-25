const express = require("express");
const app = express();
const PORT = process.env.PORT||8080;
const usersRouter=require('./routes/users');
const postsRouter=require('./routes/posts');
const signupRouter=require('./routes/signup');

app.use(express.json());

app.use('/users',usersRouter);
app.use('/posts',postsRouter);
app.use('/signup',signupRouter);

app.listen(PORT,()=>{
  console.log(`Server is listening on ${PORT}`);
})