import React,{Component} from 'react';
// import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';
import HomePage from './pages/HomePage/HomePage'
import PostDetails from './components/PostDetails/PostDetails';
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";


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
            {/* <Signup /> */}
            <Switch>
            <Signup path='/signup' exact render= {() => <Signup />}/>
            <Redirect from='/home' to='/'/>
            <Route path='/' exact
                render={(props) => (
                    <HomePage {...props} posts={this.state.posts} />
                )} 
            />
            <Route  path="/posts/:postsId" exact
            render={(props) => (<PostDetails {...props} posts={this.state.posts.find(el => el.id === props.match.params.postsId)}/>)} />
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