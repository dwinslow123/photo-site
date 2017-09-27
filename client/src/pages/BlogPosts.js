import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pages.css';

export default class BlogPosts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [
        { title: 'This is a fake title',
          _id: '34593u4eworj'
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
        <Link to='/new-post'><button className="btn btn-default btn-sm">Add a new post!</button></Link>
        { posts.map((post) => {
          return (
            <div key={post._id}>
              <Link to={`posts/${post._id}`}>{post.title}</Link>
            </div>
          )
        })}
      </div>
    );
  }
}
