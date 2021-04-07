import React from "react";
import axios from "axios";
import "./OfferModule.scss";
import Select from "../Select/Select";
import { Button, Pane, Heading } from "evergreen-ui";
import { Form, withFormik } from "formik";
import FormikFormField from "../FormikFormField/FormikFormField";
import { getUser } from "../../utils/auth";
import { IMAGE_BASE_URL } from "../../utils/constants";
import { getToken } from "../../utils/auth";
import { redirect } from "../../utils/history";
class OfferModule extends React.Component {
  state = {
    offers: null,
    display: false,
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
    console.log(this.props);
    return (
      <Form>
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
              src={`${IMAGE_BASE_URL}${this.props.posts.images}`}
              alt=""
            />
            <div>
              <FormikFormField
                label={"My Toys:"}
                name={"buyer_post_id"}
                component={Select}
              />
              <FormikFormField
                label={"Message:"}
                type="textarea"
                name="buyer_message"
                placeholder="Message placeholder..."
              />
            </div>
          </Pane>
          <Pane className="offer-module__btn">
            <Button
              className="offer-module__btn-offer"
              appearance="primary"
              disabled={!this.props.isValid}
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
      </Form>
    );
  }
}

export default withFormik({
  mapPropsToValues: (props) => ({
    seller_post_id: props.posts.id,
    seller_user_id: props.posts.user_id,
    buyer_user_id: getUser().id,
  }),
  validate: (values) => {
    const errors = {};

    if (!values.buyer_post_id) {
      errors.buyer_post_id = "Required";
    }

    return errors;
  },
  handleSubmit: (values, { setSubmitting }) => {
    setSubmitting(true);
    axios
      .post(`http://localhost:8080/offers`, values, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        console.log(response);
        redirect(`/offers/${response.data.id}`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
  displayName: "OfferForm",
})(OfferModule);
