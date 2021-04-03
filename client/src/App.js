import React, { Component } from "react";
// import Profile from './pages/Profile/Profile';
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import LoginRequired from "./pages/Login/LoginRequired";
import HomePage from "./pages/HomePage/HomePage";
import MainPage from "./components/MainPage/MainPage";
import PostDetails from "./components/PostDetails/PostDetails";
import axios from "axios";
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
    if (this.state.posts !== null && this.state.users !== null) {
      return (
        <div className="App">
          <BrowserRouter>
            <Router className="App">
              <Switch>
                <MainPage
                  path="/"
                  exact
                  render={() => (
                    <LoginRequired>
                      <MainPage />
                    </LoginRequired>
                  )}
                />
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
                {/* <Redirect from='/home' to='/'/> */}
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
                  path="/posts/:postsId"
                  exact
                  render={(props) => (
                    <LoginRequired>
                      <PostDetails
                        {...props}
                        posts={this.state.posts.find(
                          (el) => el.id === props.match.params.postsId
                        )}
                      />
                    </LoginRequired>
                  )}
                />
              </Switch>
            </Router>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      );
    }
  }
}
export default App;
