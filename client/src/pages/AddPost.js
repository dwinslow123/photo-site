import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl } from 'react-bootstrap';
import './pages.css';

export default class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value })
  }
  handleContent(e) {
    this.setState({ content: e.target.value })
  }
  submitPost(e) {
    e.preventDefault();
    const { title, content } = this.state;
    const newPost = { title, content, author: localStorage.getItem('uuID') };
    this.setState({ title: '', content: '' });
    axios.post('http://localhost:3030/new-post', newPost)
    .then((data) => {
      const newPostID = data.data._id;
      window.location = `/posts/${newPostID}`
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <form clasName="Login-form">
        <FormGroup className="Login-group" controlId="titleForm">
          Title
          <FormControl 
            id="titleForm"
            onChange={this.handleContent}
            placeholder="Title"
            type="text"
            value={this.state.title}
          />
        </FormGroup>
        <FormGroup className="Login-group" controlId="contentForm">
          <FormControl 
            id="contentForm"
            onChange={this.handleContent}
            placeholder="Content"
            type="text"
            value={this.state.content}
          />
        </FormGroup>
        <button className="btn btn-sm btn-success SubmitButton" type="submit" onClick={this.submitPost}>
          Submit a post!
        </button>
      </form>
    );
  }
}