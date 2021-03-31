import React from 'react';
import axios from 'axios';
import backArrow from '../../assets/Icons/arrow_back-24px.svg';
import edit from "../../assets/Icons/edit-25px.svg";
import { Link } from 'react-router-dom';

class PostDetails extends React.Component{
  state = {
      posts: null,
  }
  componentDidMount(){
      axios.get(`http://localhost:8080/posts/${this.props.parentProps.match.params.postsId}`)
      .then(
          response => {
              console.log(response);
            this.setState({
              posts: response,
            });
          })
  }
  render(){
  if(this.state.posts !== null) {
  const singlePost = this.state.post;
  console.log(singlePost);
      return (
          <div className="details">
              <div className="details__namearrow">
                  <Link className="details__link" to={'/'}>
                      <div className='details__box'>
                          <img className="details__arrow" alt="back arrow" src={backArrow} />
                          <p className="details__name">{singlePost.data.name}</p>
                      </div>
                  </Link>
                  <Link className="details__button" to={`/warehouses/${singlePost.data.id}/edit-warehouse`}>
                      <div className='details__button-box'><img src={edit} alt={"more"} className="details__button-edit" />
                      </div>
                      <p className="details__button-name">Edit</p>
                  </Link>
              </div>
              {/* <div className="details__namearrow">
                  <PostCard postData={singlePost} />
              </div> */}
          </div >
      ) 
  } else{
      return(
          <div>
              <h1>LOADING</h1>
          </div>
      )
  }
}    
  
  
  
}
export default PostDetails;