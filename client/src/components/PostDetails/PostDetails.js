import React from "react";
import axios from "axios";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import OfferModule from "../OfferModule/OfferModule";
import { Link } from "react-router-dom";
import {
  TextInputField,
  Button,
  Pane,
  Heading,
  Paragraph,
  Strong,
  Text,
} from "evergreen-ui";

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
    if (this.state.posts !== null) {
      const singlePost = this.state.posts;
      console.log(singlePost);
      return (
        <Pane className="details">
          <div className="details__namearrow">
            <Link className="details__link" to={"/posts"}>
              <div className="details__box">
                <img
                  className="details__arrow"
                  alt="back arrow"
                  src={backArrow}
                />
              </div>
            </Link>
            <div className="details__box">
              <Paragraph className="details__name">
                {singlePost.data.name}
              </Paragraph>
            </div>
            <div className="details__box">
              <img
                width={500}
                src={`http://localhost:8080/images/${singlePost.data.images}`}
              />
            </div>
            <div className="details__box">
              <Paragraph
                size={500}
                marginTop="default"
                className="details__name"
              >
                <Strong>Details:</Strong> {singlePost.data.description}
              </Paragraph>
            </div>
            <div className="details__box">
              <Paragraph
                size={500}
                marginTop="default"
                className="details__name"
              >
                <Strong>Condition:</Strong> {singlePost.data.tradeCondition}
              </Paragraph>
            </div>
            <div className="details__box">
              <Paragraph
                size={500}
                marginTop="default"
                className="details__name"
              >
                <Strong>Posted By:</Strong> {singlePost.data.users.name}
              </Paragraph>
              <img
                width={100}
                src={`http://localhost:8080/images/${singlePost.data.users.images}`}
              />
            </div>
            <div className="details__box">
              <Paragraph
                size={500}
                marginTop="default"
                className="details__name"
              >
                ❤️ {singlePost.data.likes}
              </Paragraph>
            </div>
            <div className="details__box">
              <Paragraph className="details__name">
                <Strong>Value:</Strong> {singlePost.data.value}
              </Paragraph>
            </div>
            <Button appearance="primary" onClick={this.renderOfferModule}>
              Trade
            </Button>
            {this.state.display && (
              <OfferModule
                posts={singlePost.data}
                proposeOfferModule={this.proposeOfferModule}
                cancelOfferModule={this.cancelOfferModule}
              />
            )}
          </div>
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
