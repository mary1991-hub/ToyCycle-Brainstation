import React, { Component } from "react";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import LoginRequired from "./pages/Login/LoginRequired";
import HomePage from "./pages/HomePage/HomePage";
import PostDetails from "./components/PostDetails/PostDetails";
import AddPost from "./pages/AddPost/AddPost";
import axios from "axios";
import Header from "./components/Header/Header";
import MyTrades from "./components/MyTrades/MyTrades";
import history from "./utils/history";
import { Router, Switch, Route } from "react-router-dom";
import Logout from "./pages/Login/Logout";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      posts: null,
    };
  }

  componentDidMount() {
    let one = axios.get(`http://localhost:8080/users`);
    let two = axios.get(`http://localhost:8080/posts`);
    axios
      .all([one, two])
      .then(
        axios.spread((...responses) => {
          console.log(responses[1].data);
          this.setState({
            users: responses[0].data,
            posts: responses[1].data,
          });
        })
      )
      .catch((errors) => {});
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match !== undefined &&
      prevProps.match.params.id !== this.props.match.params
    ) {
      let one = axios.get(`http://localhost:8080/users`);
      let two = axios.get(`http://localhost:8080/users/posts`);
      axios
        .all([one, two])
        .then(
          axios.spread((...responses) => {
            this.setState({
              users: responses[0].data,
              posts: responses[1].data,
            });
          })
        )
        .catch((errors) => {
          console.log(errors);
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Header />
          <Switch>
            <Signup path="/" exact render={() => <Signup />} />
            <Route path="/signup" exact render={() => <Signup />} />
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/logout" exact render={() => <Logout />} />
            <Route
              path="/posts"
              exact
              render={(props) => (
                <LoginRequired>
                  <HomePage {...props} uri={"/posts"} />
                </LoginRequired>
              )}
            />
            <Route
              path="/posts/my"
              exact
              render={(props) => (
                <LoginRequired>
                  <HomePage {...props} uri={"/posts/my"} />
                </LoginRequired>
              )}
            />
            <Route
              path="/posts/add"
              exact
              render={(props) => (
                <LoginRequired>
                  <AddPost {...props} />
                </LoginRequired>
              )}
            />
            <Route
              path="/profile"
              exact
              render={() => (
                <LoginRequired>
                  <Profile />
                </LoginRequired>
              )}
            />
            <Route
              path="/offers/my"
              exact
              render={() => (
                <LoginRequired>
                  <MyTrades to={"my"} />
                </LoginRequired>
              )}
            />
            <Route
              path="/offers/me"
              exact
              render={() => (
                <LoginRequired>
                  <MyTrades to={"me"} />
                </LoginRequired>
              )}
            />
            <Route
              path="/offers/:offerId"
              exact
              render={(props) => (
                <LoginRequired>
                  <MyTrades to={props.match.params.offerId} />
                </LoginRequired>
              )}
            />
            <Route
              path="/posts/:postsId"
              exact
              render={(props) => (
                <LoginRequired>
                  <PostDetails {...props} />
                </LoginRequired>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
