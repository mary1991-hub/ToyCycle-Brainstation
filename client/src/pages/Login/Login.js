import React, { Component } from "react";
import axios from "axios";
import { isAuthenticated } from "../../utils/auth";
import { Redirect } from "react-router";
import { login } from "../../utils/auth";
import { TextInputField, Button, Pane, Heading } from "evergreen-ui";
const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;

class Login extends Component {
  state = {
    isSignedUp: false,
    isLoggedIn: isAuthenticated(),
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

        login(response.data.token, response.data.user);

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
      <Pane display="flex" alignItems="center" justifyContent="center">
        <Pane border="default" width={300} padding={20}>
          <Heading size={700}>Login</Heading>
          {isLoginError && (
            <label style={{ color: "red" }}>{errorMessage}</label>
          )}
          <form
            ref={(form) => (this.loginForm = form)}
            style={{ marginTop: 10 }}
          >
            <TextInputField label="Username:" type="text" name="username" />
            <TextInputField label="Password:" type="password" name="password" />
            <Button appearance="primary" onClick={this.login}>
              Login
            </Button>
          </form>
        </Pane>
      </Pane>
    );
  }

  render() {
    const { isLoggedIn } = this.state;

    if (!isLoggedIn) return this.renderLogin();

    return <Redirect to="/posts" />;
  }
}
export default Login;
