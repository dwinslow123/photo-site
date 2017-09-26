import React, { Component } from 'react';
import axios from 'axios';

import { Comment } from './Comment';

export default class SinglePost extends Component {
  constructor() {
    super();
    this.state = {
      post: {
        title: '',
        _id: '',
        author: '',
        content: '',
        comments: [
          {
            text: '',
            author: ''
          }
        ]
      },
      comment: '',
    };
    this.handleCommentText = this.handleCommentText.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    this.getBlogPost();
  }

  getBlogPost() {
    const { id } = this.props.match.params;
    axios.get(`http://localhost:3030/posts/${id}`)
    .then((data) => {
      this.setState({ post: data.data });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addComment(e) {
    e.preventDefault();
    const { comment } = this.state;
    const { id } = this.props.match.params;
    const newComment = {
      text: comment,
      author: localStorage.getItem('uuID'),
    };
    this.setState({ comment: '' });
    axios.put(`http://localhost:3030/posts/{id}`, newComment)
    .then((data) => {
      setTimeout(() => {
        this.getBlogPost();
      }, 200);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleCommentText(e) {
    this.setState({ comment: e.target.value });
  }

  render() {
    const { title, comments, content, author } = this.state.post;
    return (
      <div>
        <h3>{title}</h3>
        <h5>{author}</h5>
        <div>{content}</div>
        {comments.map((comment, i) => {
          return <Comment comment={comment} key={i} />
        })}
        <p>Add comments</p>
        <form onSubmit={this.addComment}>
          <textarea 
            onChange={this.handleCommentText}
            value={this.state.comment}
            placeholder="Tell us what you think!"
          />
          <button className="btn btn-default btn-sm" type="submit" onClick={this.addComment}>Submit your comment</button>
        </form>
      </div>
    );
  }
}