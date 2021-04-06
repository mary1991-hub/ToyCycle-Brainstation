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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
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
        <BrowserRouter>
          <Router className="App">
            <Header />
            <Switch>
              <Signup path="/" exact render={() => <Signup />} />
              <Route
                path="/signup"
                exact
                render={() => (
                  <LoginRequired>
                    <Signup />
                  </LoginRequired>
                )}
              />
              <Route path="/login" exact render={() => <Login />} />
              <Route path="/logout" exact render={() => <Logout />} />
              <Route
                path="/posts"
                exact
                render={(props) => (
                  <LoginRequired>
                    <HomePage {...props} posts={this.state.posts} />
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
                path="/offers"
                exact
                render={() => (
                  <LoginRequired>
                    <MyTrades />
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
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
