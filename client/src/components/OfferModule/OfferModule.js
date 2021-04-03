import React from "react";
import axios from "axios";
import "./OfferModule.scss";
import backArrow from "../../assets/Icons/arrow_drop_down-24px.svg";
import Select from "../Select/Select";

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

        <div className="offer-module">
          <input
            type="button"
            onClick={this.props.cancelOfferModule}
            className="offer-module__close"
          />
          <div>
            <p className="offer-module__header">
              Offer for the {this.props.posts.name}
            </p>
            <img
              className="offer-module__image"
              src={`http://localhost:8080/images/${this.props.posts.images}`}
            />
            <textarea
              className="offer-module__message"
              type="text"
              placeholder="message"
              resize="none"
            ></textarea>
          </div>
          <div className="details__box">
            <img
              onClick={this.renderSelect}
              className="details__arrow"
              alt="back arrow"
              src={backArrow}
            />
            {this.state.display && <Select posts={this.props.posts} />}
          </div>
          <div className="offer-module__btn">
            <button
              onClick={this.props.proposeOfferModule}
              className="offer-module__btn-offer"
            >
              Offer
            </button>
            <button
              onClick={this.props.cancelOfferModule}
              className="offer-module__btn-cancel"
            >
              {" "}
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default OfferModule;
