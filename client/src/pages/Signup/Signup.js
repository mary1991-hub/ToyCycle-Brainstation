import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "./Signup.scss";
import {
  TextInputField,
  Button,
  Pane,
  Heading,
  FilePicker,
} from "evergreen-ui";

const baseUrl = "http://localhost:8080";
const signupUrl = `${baseUrl}/signup`;

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
      <Pane
        className="signup"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Pane className="signup__image">
          <img
            src=" https://images.unsplash.com/photo-1531512721928-a2c9d1a3fb9f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8NDQ1MzQ4NHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
        </Pane>
        <Pane className="signup__form" border="default" padding={20}>
          <Heading size={700}>Wellcome to ToyCycle</Heading>
          <form ref={(form) => (this.signUpForm = form)}>
            <TextInputField label="Username:" type="text" name="username" />
            <TextInputField label="Name:" type="text" name="name" />
            <TextInputField label="Address:" type="text" name="address" />
            <TextInputField label="City:" type="text" name="city" />
            <TextInputField label="Email:" type="text" name="email" />
            <TextInputField label="Phone:" type="text" name="phone" />
            <FilePicker
              multiple
              width={460}
              marginBottom={32}
              onChange={(files) => console.log(files)}
              placeholder="Select an image to upload..."
              label="Profile Image:"
              class="form-control"
              type="File"
              name="uploaded_image"
              accept=""
            />
            <TextInputField label="Password:" type="password" name="password" />
            <Button appearance="primary" onClick={this.signup}>
              Sign In
            </Button>
          </form>
        </Pane>
      </Pane>
    );
  }

  render() {
    const { isSignedUp } = this.state;

    if (!isSignedUp) return this.renderSignUp();

    return;
    <Redirect to="/posts" />;
  }
}
export default Signup;
