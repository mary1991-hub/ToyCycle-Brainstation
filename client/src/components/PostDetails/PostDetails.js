import React from 'react';
import axios from 'axios';
import backArrow from '../../assets/Icons/arrow_back-24px.svg';
import OfferModule from '../OfferModule/OfferModule';
import { Link } from 'react-router-dom';

class PostDetails extends React.Component{
  state = {
      posts: null,
      users:null,
      display:false
  }

  
  componentDidMount(){
    axios.get(`http://localhost:8080/posts/${this.props.match.params.postsId}`)
      .then(
         response => {
              console.log(response);
            this.setState({
              posts: response,
            });
          })
  }

//   componentDidMount(){
//     axios.get(`http://localhost:8080/users/${this.props.match.params.usersId}`)
//       .then(
//          response => {
//               console.log(response);
//             this.setState({
//               users: response,
//             });
//           })
//   }
  renderOfferModule = () => {
    this.setState({
        display: true,
    })
}

cancelOfferModule = () => {
    this.setState({
        display: false,
    })
}

proposeOfferModule = () => {
    this.setState({
        display: false,
    })

}

  render()
  {console.log(this.props);
  if(this.state.posts !== null) {
  const singlePost = this.state.posts;
  console.log(singlePost);
      return (
          <div className="details">
              <div className="details__namearrow">
                  <Link className="details__link" to={'/'}>
                      <div className='details__box'>
                          <img className="details__arrow" alt="back arrow" src={backArrow} />    
                      </div>
                  </Link>
                  <div className='details__box'>
                  <p className="details__name">{singlePost.data.name}</p>
                    </div>
                  <div className='details__box'>
                  <img src={`http://localhost:8080/images/${singlePost.data.images}`}/>
                    </div>
                    <div className='details__box'>
                          <p className="details__name">Details: {singlePost.data.description}</p>
                    </div>
                    <div className='details__box'>
                          <p className="details__name">Condition: {singlePost.data.tradeCondition}</p>
                    </div>
                    <div className='details__box'>
                          <p className="details__name">❤️ {singlePost.data.likes}</p>
                    </div>
                    <div className='details__box'>
                          <p className="details__name">Value: {singlePost.data.value}</p>
                    </div>
                    <button onClick={this.renderOfferModule} className="offer-module__btn-offer">TRADE</button>
                {this.state.display && <OfferModule posts={singlePost.data} proposeOfferModule={this.proposeOfferModule} cancelOfferModule={this.cancelOfferModule}/>}
              </div>
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