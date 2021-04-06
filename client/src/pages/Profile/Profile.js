import axios from "axios";
import { Component } from "react";
import { getToken } from "../../utils/auth";

// const baseUrl = "http:localhost:8080";
// const profileUrl = `${baseUrl}/profile`;

class Profile extends Component {
  state = {
    isLoading: true,
    userInfo: null,
  };
  componentWillMount() {
    const token = sessionStorage.getItem("authToken");

    axios
      .get(`http://localhost:8080/profile/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          userInfo: response.data,
          isLoading: false,
        });
      });
  }
  render() {
    const { isLoading, userInfo } = this.state;
    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <h1>Welcome {this.state.data.name}</h1>
    );
  }
}
export default Profile;
