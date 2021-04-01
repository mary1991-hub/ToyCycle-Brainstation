import React, { Component } from 'react';
import { Link } from "react-router-dom";


class SinglePost extends Component {

    render() {
        return (
            <li key={this.props.posts.id} className="postCard">
                <Link to={`/posts/${this.props.posts.id}`} className="">
                <img src={`http://localhost:8080/images/${this.props.posts.images}`}/>
                </Link>
                <Link to={`/posts/${this.props.posts.id}`} className="">
                    <p>{this.props.posts.name}</p>
                </Link>
            </li>
        );
    }
}

export default SinglePost;