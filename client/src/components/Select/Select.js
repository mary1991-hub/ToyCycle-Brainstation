import React from "react";
import axios from "axios";
import "./Select.scss";
import { getToken } from "../../utils/auth";
// import { getUser } from "../../utils/auth";
import { Button, SelectMenu } from "evergreen-ui";

class ControlledOpenSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: null,
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/posts`, {
        // headers: {
        //   Authorization: `Bearer ${getToken()}`,
        // },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          myPosts: response,
        });
      });
  }

  render() {
    const myPost = this.state.myPosts;
    return (
      <SelectMenu
        height={170}
        width={180}
        hasTitle={false}
        option={[
          {
            label: "Apple",
            value: "Apple",
            icon:
              "https://upload.wikimedia.org/wikipedia/commons/d/d2/Malus-Boskoop_organic.jpg",
          },
          {
            label: "Banana",
            value: "Banana",
            icon:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/2560px-Bananas_white_background_DS.jpg",
          },
        ]}
      >
        <Button>Select a toy...</Button>
      </SelectMenu>
    );
  }
}
export default ControlledOpenSelect;
