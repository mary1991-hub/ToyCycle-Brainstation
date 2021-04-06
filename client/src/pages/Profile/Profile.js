import axios from "axios";
import { Component } from "react";
import { getToken } from "../../utils/auth";
import "./Profile.scss";
import {
  Pane,
  Heading,
  UnorderedList,
  Paragraph,
  Card,
  majorScale,
  Strong,
  Li,
  Ol,
} from "evergreen-ui";

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
      <Pane className="profile">
        <Pane>
          <Heading marginTop={48} marginBottom={32} size={700}>
            Welcome {userInfo.name}
          </Heading>
          <img
            className="profile__image"
            width={500}
            src={`http://localhost:8080/images/${userInfo.images}`}
            alt=""
          />
        </Pane>
        <Pane className="profile__card">
          <Card
            width={700}
            height={300}
            background="tint2"
            marginBottom={majorScale(2)}
            padding={majorScale(1)}
          >
            <UnorderedList>
              <Paragraph size={500} marginTop="default" className="">
                <Strong>NAME:</Strong> {userInfo.name}
              </Paragraph>
              <Paragraph size={500} marginTop="default" className="">
                <Strong>ADDRESS:</Strong> {userInfo.address}
              </Paragraph>
              <Paragraph
                size={500}
                marginTop="default"
                className="profile__City"
              >
                <Strong>CITY:</Strong> {userInfo.City}
              </Paragraph>
              <Paragraph className="profile__email">
                <Strong>EMAIL:</Strong> {userInfo.email}
              </Paragraph>
              <Paragraph className="profile__phone">
                <Strong>PHONE:</Strong> {userInfo.phone}
              </Paragraph>
              <Paragraph className="profile__posts">
                <Strong>POSTS:</Strong>{" "}
                <Ol>
                  {userInfo.posts.map((post) => (
                    <Li className="profile__li" key={post.id}>
                      {post.name}
                    </Li>
                  ))}
                </Ol>
              </Paragraph>
            </UnorderedList>
          </Card>
        </Pane>
      </Pane>
    );
  }
}
export default Profile;
