import {Component} from "react";
class Profile extends Component{
  state={
    isLoading:true,
    userInfo:{},
  };
  componentWillMount(){

  }
  render(){
    const {isLoading,userInfo}=this.state;
    return isLoading ? <h1>Loading...</h1> :<h1>Welcome {userInfo.name}</h1>;
  }
}
export default Profile;