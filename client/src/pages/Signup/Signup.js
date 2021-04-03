import React, { Component } from "react";
import axios from "axios";
import Profile from "../Profile/Profile";
import { Redirect } from "react-router";
import { TextInputField, Button, Pane, Heading } from "evergreen-ui";
import { Formik } from "formik";

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;
const profilerUrl = `${baseUrl}/profile`;

class Signup extends Component {
  state = {
    isSignedUp: false,
    errorMessage: "",
  };

  signup = (e) => {
    e.preventDefault();
    console.log(this.signUpForm);
    const {
      username,
      name,
      address,
      city,
      email,
      phone,
      uploaded_image,
      password,
    } = this.signUpForm;

    console.log(uploaded_image);
    const data = new FormData();
    data.append("username", username.value);
    data.append("name", name.value);
    data.append("address", address.value);
    data.append("City", city.value);
    data.append("email", email.value);
    data.append("phone", phone.value);
    data.append("images", uploaded_image.files[0]);
    data.append("password", password.value);
    axios({
      url: signupUrl,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: data,
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

  renderSignUp() {
    return (
      <Pane display="flex" alignItems="center" justifyContent="center">
        <Pane border="default" width={300} padding={20}>
          <Heading size={700}>SignUp</Heading>
          <form ref={(form) => (this.signUpForm = form)}>
            <TextInputField label="Username:" type="text" name="username" />
            <TextInputField label="Name:" type="text" name="name" />
            <TextInputField label="Address:" type="text" name="address" />
            <TextInputField label="City:" type="text" name="city" />
            <TextInputField label="Email:" type="text" name="email" />
            <TextInputField label="Phone:" type="text" name="phone" />
            <TextInputField
              label="Profile Image:"
              class="form-control"
              type="file"
              name="uploaded_image"
              accept=""
            />
            <TextInputField label="Password:" type="password" name="password" />
            <button className="button-primary" onClick={this.signup}>
              Signup
            </button>
          </form>
        </Pane>
      </Pane>
    );
  }

  render() {
    const { isSignedUp } = this.state;

    if (!isSignedUp) return this.renderSignUp();

    return <Redirect to="/login" />;
  }
}
export default Signup;
