import React,{Component} from 'react';
import Profile from './pages/Profile';
import axios from "axios";

const baseUrl="http:localhost:8080";
const loginUrl=`${baseUrl}/login`;
const signupUrl=`${baseUrl}/signup`;
const profilrUrl=`${baseUrl}/profile`;


class App extends Component {
  state ={
    isSignedUp:false,
    isLoggedIn:false,
    isLoginError:false,
    errorMessage:""
  };

  login =(e)=>{
  };

  signup=(e)=>{
    e.preventDefault();
    console.log(this.signUpForm);
    const {username, name, password}=this.signUpForm;

    axios.post(signupUrl,{
      username:username.value,
      name:name.value,
      password:password.value
    })
    .then(response=>{
      console.log(response);
    })
    .catch((err)=>{
      console.log(err);
    })
  };


  renderSignUp(){
    return (
      <div>
        <h1>SignUp</h1>
        <form ref={(form)=>(this.signUpForm=form)}>
          <div className="form-group">
            Username:<input type ="text"name="username"/>
          </div>
          <div className="form-group">
            Name:<input type ="text"name="name"/>
          </div>
          <div className="form-group">
            Password:<input type ="password"name="password"/>
            <button className="button-primary" onClick={this.signup}>
              Signup
            </button>
          </div>
        </form>
      </div>
    ); 
  }

  renderLogin(){
    const{isLoginError, errorMessage}=this.state;
    return (
      <div>
        <h1>Login</h1>
        {isLoginError && <label style={{color:"red"}}>{errorMessage}</label>}
        <form ref={(form)=>(this.loginForm=form)}>
          <div className="form-group">
            Username:<input type ="text"name="username"/>
          </div>
          <div className="form-group">
            Password:<input type ="password"name="password"/>
            <button className="button-primary" onClick={this.login}>
             Login
            </button>
          </div>
        </form>
      </div>
    ); 
  };

  render(){
    const {isLoggedIn ,isSignedUp}=this.state;

    if(!isSignedUp)return this.renderSignUp();
    if(!isLoggedIn)return this.renderLogin();

    return(
      <div>
        <Profile/>
      </div>
    );
  }
}
export default App;
