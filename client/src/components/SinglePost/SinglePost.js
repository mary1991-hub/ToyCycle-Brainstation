import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SinglePost.scss";
import { TextInputField, Button, Pane, Heading, Card } from "evergreen-ui";

class SinglePost extends Component {
  render() {
    return (
      <Card border="default" width={304} margin={20}>
        <Pane>
          <Link to={`/posts/${this.props.posts.id}`}>
            <img
              width={300}
              src={`http://localhost:8080/images/${this.props.posts.images}`}
            />
          </Link>
        </Pane>

        <Pane padding={10}>
          <Link
            to={`/posts/${this.props.posts.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            {this.props.posts.name}
          </Link>
        </Pane>
      </Card>
    );
  }
}

export default SinglePost;
