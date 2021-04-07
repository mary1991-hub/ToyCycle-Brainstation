import React from "react";
import axios from "axios";
import "./Select.scss";
import { getToken } from "../../utils/auth";
import { SelectMenu, Button } from "evergreen-ui";

class ControlledOpenSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: null,
      loading: true,
      selected: null,
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
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { myPosts, selected, loading } = this.state;
    const { onChange } = this.props;
    if (loading) {
      return <p>"Loading.."</p>;
    }
    const options = myPosts.map((posting) => {
      return {
        label: posting?.name,
        value: posting,
        icon: `http://localhost:8080/images/${posting.images}`,
      };
    });
    return (
      <SelectMenu
        title="Select your positing to trade"
        selected={selected}
        options={options}
        onSelect={(option) => {
          this.setState({ selected: option.value });
          if (onChange) {
            onChange(option.value.id);
          }
        }}
      >
        <Button
          iconBefore={
            selected ? (
              <img
                width={24}
                src={`http://localhost:8080/images/${selected.images}`}
              />
            ) : null
          }
        >
          {selected ? selected.name : "Select your posting to trade..."}
        </Button>
      </SelectMenu>
    );
  }
}
export default ControlledOpenSelect;
