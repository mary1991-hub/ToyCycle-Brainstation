import React from "react";
import axios from "axios";
import OfferModule from "../OfferModule/OfferModule";
import "./PostDetail.scss";
import {
  Button,
  Pane,
  Paragraph,
  Strong,
  Card,
  UnorderedList,
  majorScale,
} from "evergreen-ui";
import { getUser, getToken } from "../../utils/auth";
import { API_BASE_URL } from "../../utils/constants";
import { redirect } from "../../utils/history";

const deletePost = (postId) => {
  axios
    .delete(`${API_BASE_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then(() => {
      redirect("/posts/my");
      window.location.reload();
    });
};
class PostDetails extends React.Component {
  state = {
    posts: null,
    users: null,
    display: false,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/posts/${this.props.match.params.postsId}`)
      .then((response) => {
        console.log(response);
        this.setState({
          posts: response,
        });
      });
  }

  renderOfferModule = () => {
    this.setState({
      display: true,
    });
  };

  cancelOfferModule = () => {
    this.setState({
      display: false,
    });
  };

  proposeOfferModule = () => {
    this.setState({
      display: false,
    });
  };

  render() {
    console.log(this.props);
    const user = getUser();
    if (this.state.posts !== null) {
      const singlePost = this.state.posts;
      console.log(singlePost);
      return (
        <Pane className="details">
          <Pane>
            <img
              className="details__image"
              width={500}
              src={`http://localhost:8080/images/${singlePost.data.images}`}
              alt=""
            />
          </Pane>
          <Pane className="details__card">
            <Card
              background="tint2"
              marginBottom={majorScale(2)}
              padding={majorScale(1)}
            >
              <UnorderedList>
                <Paragraph size={500} marginTop="default" className="">
                  <Strong>NAME:</Strong> {singlePost.data.name}
                </Paragraph>
                <Paragraph size={500} marginTop="default" className="">
                  <Strong>DETAILS:</Strong> {singlePost.data.description}
                </Paragraph>
                <Paragraph
                  size={500}
                  marginTop="default"
                  className="details__trade"
                >
                  <Strong>TRADE CONDITION:</Strong>{" "}
                  {singlePost.data.tradeCondition}
                </Paragraph>
                <Paragraph className="">
                  <Strong>VALUE:</Strong> {singlePost.data.value}
                </Paragraph>
                <Paragraph
                  className="details__owner"
                  size={500}
                  marginTop="default"
                >
                  <Strong>
                    <img
                      className="details__avatar"
                      width={30}
                      src={`http://localhost:8080/images/${singlePost.data.users.images}`}
                    />
                  </Strong>{" "}
                  {singlePost.data.users.name}
                </Paragraph>
              </UnorderedList>
            </Card>
            <Pane>
              {user.id === singlePost.data.user_id ? (
                <Button
                  appearance={"danger"}
                  margin={4}
                  onClick={() => deletePost(singlePost.data.id)}
                >
                  Delete
                </Button>
              ) : null}
              <Button
                className="details__btn"
                appearance="primary"
                onClick={this.renderOfferModule}
              >
                OFFER
              </Button>
            </Pane>
            {this.state.display && (
              <OfferModule
                posts={singlePost.data}
                proposeOfferModule={this.proposeOfferModule}
                cancelOfferModule={this.cancelOfferModule}
              />
            )}
          </Pane>
        </Pane>
      );
    } else {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      );
    }
  }
}

export default PostDetails;
