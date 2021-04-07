import React from "react";
import axios from "axios";
import { getToken, getUser } from "../../utils/auth";
import {
  Button,
  ArrowsHorizontalIcon,
  Avatar,
  Pane,
  Heading,
  majorScale,
  Strong,
  Paragraph,
} from "evergreen-ui";
import { API_BASE_URL, IMAGE_BASE_URL } from "../../utils/constants";

const doAction = (offer, action) => {
  axios.post(`${API_BASE_URL}/offers/${offer.id}/${action}`).then(() => {
    window.location.reload();
  });
};

const accept = (offer) => doAction(offer, "accept");
const reject = (offer) => doAction(offer, "reject");
const cancel = (offer) => doAction(offer, "cancel");

export const Offer = ({ offer }) => {
  const user = getUser();
  return (
    <Pane
      marginLeft={60}
      width={500}
      borderRadius={3}
      border="muted"
      padding={majorScale(1)}
      marginTop={majorScale(2)}
    >
      <Pane
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pane paddingLeft={60}>
          <div>
            <Avatar
              name={offer.buyer.name}
              src={`${IMAGE_BASE_URL}${offer.buyer.images}`}
              size={64}
            />
          </div>
          <div>
            <img
              width={150}
              src={`${IMAGE_BASE_URL}${offer.buyerPost.images}`}
            />
          </div>
        </Pane>
        <ArrowsHorizontalIcon
          size={32}
          color={"muted"}
          style={{ margin: 20 }}
        />
        <Pane>
          <div>
            <Avatar
              name={offer.seller.name}
              src={`${IMAGE_BASE_URL}${offer.seller.images}`}
              size={64}
            />
          </div>
          <div>
            <img
              width={150}
              src={`${IMAGE_BASE_URL}${offer.sellerPost.images}`}
            />
          </div>
        </Pane>
      </Pane>
      {offer.buyer_message ? (
        <Pane>
          <Strong paddingLeft={60}>Message: </Strong>
          <Paragraph paddingLeft={60}>{offer.buyer_message}</Paragraph>
        </Pane>
      ) : null}

      {offer.seller_message ? (
        <Pane>
          <Strong paddingLeft={60}>Message: </Strong>
          <Paragraph paddingLeft={60}>{offer.seller_message}</Paragraph>
        </Pane>
      ) : null}
      <Pane>
        <Strong paddingLeft={60}>Status: </Strong>
        <Paragraph paddingLeft={60}>{offer.status}</Paragraph>
      </Pane>
      {offer.status === "Pending" || offer.status !== "Canceled" ? (
        <Pane
          marginTop={majorScale(1)}
          padding={majorScale(1)}
          background="tint2"
          border="muted"
        >
          {user.id == offer.seller.id && offer.status !== "Canceled" ? (
            <Button marginLeft={50} onClick={() => accept(offer)}>
              Accept
            </Button>
          ) : null}
          {user.id == offer.seller.id && offer.status !== "Canceled" ? (
            <Button marginLeft={20} onClick={() => reject(offer)}>
              Reject
            </Button>
          ) : null}
          {user.id == offer.buyer.id && offer.status !== "Canceled" ? (
            <Button marginLeft={20} onClick={() => cancel(offer)}>
              Cancel
            </Button>
          ) : null}
        </Pane>
      ) : null}
    </Pane>
  );
};

const MyTrades = (props) => {
  const [state, setState] = React.useState({ loading: true });
  React.useEffect(() => {
    setState({ loading: true });
    axios
      .get(`${API_BASE_URL}/offers/${props.to}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        console.log(response);
        setState({
          [props.to]: response,
          loading: false,
        });
      });
  }, [props.to, setState]);

  const myOffers = state[props.to];
  if (state.loading || !myOffers) {
    return <p>"Loading.."</p>;
  }

  const offers = Array.isArray(myOffers.data) ? myOffers.data : [myOffers.data];
  return (
    <Pane>
      <Heading marginTop={38} marginBottom={32} marginLeft={60} size={700}>
        {props.to === "my"
          ? "My Offers"
          : props.to === "me"
          ? "Offers to me"
          : "Offer"}
      </Heading>
      {offers.map((offer) => (
        <Offer offer={offer} />
      ))}
    </Pane>
  );
};

export default MyTrades;
