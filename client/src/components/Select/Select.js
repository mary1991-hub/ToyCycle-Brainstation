import React from "react";
import axios from "axios";
import "./Select.scss";
import { getToken } from "../../utils/auth";
import { Li, Ul } from "evergreen-ui";

class ControlledOpenSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: null,
      image: null,
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/posts/my`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          myPosts: response.data,
        });
      });
  }
  // handleSelect = () => {
  //   this.setState({
  //     image: this.state.myPosts.data.images,
  //   });
  // };
  render() {
    const myData = this.state.myPosts;
    if (!myData) {
      return <p>"Loading.."</p>;
    }
    return (
      <Ul>
        {myData.map((data) => (
          <Li key={data.id} onClick>
            {data.name}
          </Li>
        ))}
      </Ul>
    );
  }
}
export default ControlledOpenSelect;
