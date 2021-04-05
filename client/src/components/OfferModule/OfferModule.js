import React from "react";
import axios from "axios";
import "./OfferModule.scss";
import backArrow from "../../assets/Icons/arrow_drop_down-24px.svg";
import Select from "../Select/Select";
import { Button, Pane, Heading, Textarea } from "evergreen-ui";

class OfferModule extends React.Component {
  state = {
    offers: null,
    display: false,
  };

  renderSelect = () => {
    this.setState({
      display: true,
    });
  };
  componentDidMount() {
    axios.get(`http://localhost:8080/offers`).then((response) => {
      console.log(response);
      this.setState({
        offers: response,
      });
    });
  }
  render() {
    return (
      <>
        <span className="offer-module--grey-background"></span>
        <Pane className="offer-module">
          <input
            type="button"
            onClick={this.props.cancelOfferModule}
            className="offer-module__close"
          />
          <Heading className="offer-module__heading">
            {this.props.posts.name}
          </Heading>
          <Pane className="offer-module__buy">
            <img
              className="offer-module__image"
              src={`http://localhost:8080/images/${this.props.posts.images}`}
              alt=""
            />
            <Textarea name="textarea-1" placeholder="Message placeholder..." />
          </Pane>
          <div className="details__box">
            <img
              onClick={this.renderSelect}
              className="details__arrow"
              alt="back arrow"
              src={backArrow}
            />
            {this.state.display && <Select posts={this.props.posts} />}
          </div>
          <Pane className="offer-module__btn">
            <Button
              className="offer-module__btn-offer"
              appearance="primary"
              onClick={this.proposeOfferModule}
            >
              Offer
            </Button>
            <Button
              className="offer-module__btn-cancel"
              appearance="primary"
              onClick={this.cancelOfferModule}
            >
              Cancel
            </Button>
          </Pane>
        </Pane>
      </>
    );
  }
}

export default OfferModule;
