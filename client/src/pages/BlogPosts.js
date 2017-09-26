import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pages.css';

class BlogPosts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [
        { title: '',
          _id: ''
        },
      ]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/posts')
    .then((data) => {
      this.setState({ posts: data.data });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        <Link to='/new-post'><button className="btn btn-default btn-sm">Add a new photo!</button></Link>
        { posts.map((post, i) => {
          return (
            <div key={i}>
              <Link to={`posts/${post._id}`}>{post.title}</Link>
            </div>
          )
        })}
      </div>
    );
  }
}

export default BlogPosts;