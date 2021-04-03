import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import axios from "axios";
import Profile from "../../pages/Profile/Profile";
import "./MainPage.scss";

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;
const profilerUrl = `${baseUrl}/profile`;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ToyCycle
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const classes = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//   },
//   image: {
//     backgroundImage:
//       "url(https://images.unsplash.com/photo-1531512721928-a2c9d1a3fb9f?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8NDQ1MzQ4NHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)",
//     backgroundRepeat: "no-repeat",
//     backgroundColor:
//       theme.palette.type === "light"
//         ? theme.palette.grey[50]
//         : theme.palette.grey[900],
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

class MainPage extends Component {
  state = {
    isSignedUp: false,
    isLoggedIn: false,
    isLoginError: false,
    errorMessage: "",
  };

  login = (e) => {
    e.preventDefault();
    const { username, password } = this.loginForm;

    if (username.value === "" || password.value === "") {
      this.setState({
        isLoginError: true,
        errorMessage: "Please provide a username and password",
      });

      return false;
    }

    axios
      .post(loginUrl, {
        username: username.value,
        password: password.value,
      })
      .then((response) => {
        if (response.data.error) {
          this.setState({
            isLoginError: true,
            errorMessage: response.data.error.massage,
          });

          return;
        }

        sessionStorage.setItem("authToken", response.data.token);

        this.setState({
          isLoggedIn: true,
          isLoginError: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return false;
  };

  signup = (e) => {
    e.preventDefault();
    console.log(this.signUpForm);
    const {
      username,
      name,
      address,
      City,
      email,
      phone,
      image,
      password,
    } = this.signUpForm;

    axios
      .post(signupUrl, {
        username: username.value,
        name: name.value,
        address: address.value,
        City: City.value,
        email: email.value,
        phone: phone.value,
        image: image.value,
        password: password.value,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isSignedUp: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderLogin() {
    const { isLoginError, errorMessage } = this.state;
    return (
      <Grid container component="main" className="main-page">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="main-page__image" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="main-page__avatar">
            <Avatar className="main-page__avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome To ToyCycle
            </Typography>
            <form className="main-page__form" noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="main-page__submit"
                onClick={this.state.login}
              >
                Sign in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="http://localhost:3000/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { isLoggedIn } = this.state;

    if (!isLoggedIn) return this.renderLogin();

    return (
      <div>
        <Profile />
      </div>
    );
  }
}
export default MainPage;

// export default function MainPage() {
//   const classes = useStyles();

//   return (
//     <Grid container component="main" className={classes.root}>
//       <CssBaseline />
//       <Grid item xs={false} sm={4} md={7} className={classes.image} />
//       <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Welcome To ToyCycle
//           </Typography>
//           <form className={classes.form} noValidate>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               Sign in
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="http://localhost:3000/signup" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//             <Box mt={5}>
//               <Copyright />
//             </Box>
//           </form>
//         </div>
//       </Grid>
//     </Grid>
//   );
// }
