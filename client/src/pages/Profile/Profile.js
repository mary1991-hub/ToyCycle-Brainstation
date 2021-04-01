import axios from "axios";
import {Component} from "react";

const baseUrl="http:localhost:8080";
const profileUrl=`${baseUrl}/profile`;

class Profile extends Component{
  state={
    isLoading:true,
    userInfo:{},
  };
  componentWillMount(){
    const token=sessionStorage.getItem("authToken");

    axios.get(profileUrl,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((response)=>{
      this.setState({
        userInfo:{
          name:response.data.name
        },
        isLoading:false
      });
    });
  }
  render(){
    const {isLoading,userInfo}=this.state;
    return isLoading ? <h1>Loading...</h1> :<h1>Welcome {userInfo.name}</h1>;
  }
}
export default Profile;