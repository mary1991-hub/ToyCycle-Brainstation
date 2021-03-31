import React, { Component } from 'react';
import { Link } from "react-router-dom";


class SinglePost extends Component {
    state = {
        display: false,
    }

    renderDeleteModule = () => {
        this.setState({
            display: true,
        })
    }

    cancelDeleteModule = () => {
        this.setState({
            display: false,
        })
    }

    removeDeleteModule = () => {
        this.setState({
            display: false,
        })

    }

    render() {
        return (
            <li key={this.props.posts.id} className="postCard">
                <Link to={`/posts/${this.props.posts.id}`} className="">
                <img src={`http://localhost:8080/images/${this.props.posts.images}`}/>
                </Link>
                <Link to={`/posts/${this.props.posts.id}`} className="">
                    <p>{this.props.posts.name}</p>
                </Link>
                <div className="">
                    <p>Likes:{this.props.posts.likes}</p>
                    <p>Value:{this.props.posts.value}</p>
                </div>
            </li>
        );
    }
}

export default SinglePost;