import React from "react";
import axios from "axios";
import { getToken } from "../../utils/auth";
import backArrow from "../../assets/Icons/arrow_drop_down-24px.svg";
import Select from "../Select/Select";
import { Button, Pane, Heading, Li, Textarea } from "evergreen-ui";

class MyTrades extends React.Component {
  state = {
    offers: null,
  };

  renderSelect = () => {
    this.setState({});
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8080/offers`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          offers: response,
        });
      });
  }
  render() {
    const myOffers = this.state.offers;
    if (!myOffers) {
      return <p>"Loading.."</p>;
    }
    return (
      <Pane>
        <Heading>My Offers</Heading>
        <Pane>
          {myOffers.data.map((offer) => (
            <Li key={offer.id}>{offer.seller_post_id}</Li>
          ))}
        </Pane>
      </Pane>
    );
  }
}

export default MyTrades;
