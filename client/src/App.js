import React,{Component} from 'react';
// import Profile from './pages/Profile/Profile';
// import Signup from './pages/Signup/Signup';
import Posts from './pages/Posts/Posts'
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";




// const baseUrl="http://localhost:8080";
// const loginUrl=`${baseUrl}/login`;
// const signupUrl=`${baseUrl}/signup`;
// const profilerUrl=`${baseUrl}/profile`;



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
          console.log(responses);
          this.setState({
            users: responses.data,
            posts: responses.data,

          });
        })
      )
      .catch((errors) => { });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match !== undefined && prevProps.match.params.id !== this.props.match.params) {
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
        .catch((errors) => { });
    }
  }

    render() {
      if (this.state.posts !== null && this.state.users !== null) {
      return (
        <div className="App">
          <BrowserRouter>
          <Router className="App">
            {/* <Signup /> */}
            <Switch>
              <Redirect from='/home' to='/'/>
              <Route path='/' exact
                  render={
                      <Posts posts={this.state.posts} />} />
            </Switch>
          </Router>
        </BrowserRouter>
        </div>
      );
    }else {
      return (
      <div>
        <h1>
          LOADING
        </h1>
          </div>
        )
      }
    }
}
  export default App;