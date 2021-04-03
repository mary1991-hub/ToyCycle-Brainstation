import React from "react";
import handleStyles from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./Select.scss";

class ControlledOpenSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      open: false,
    };
  }
  //   this.handleChange = this.handleChange.bind(this)
  // }

  // handleChange(event){
  //   this.setState({event.target.value})
  // }
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  componentDidMount() {
    axios.get(`http://localhost:8080/posts`).then((response) => {
      console.log(response);
      this.setState({
        posts: response,
      });
    });
  }

  render() {
    return (
      <div>
        <Button className="select__form" onClick={this.handleOpen}>
          Select a toy you want to exchange
        </Button>
        <FormControl className="select__form">
          <InputLabel id="demo-controlled-open-select-label">Toy</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={this.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.posts}
            // onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}
export default ControlledOpenSelect;
