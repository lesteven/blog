import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PostBlog from './PostBlog';

class Blog extends Component {

  render() {
    return (
      <div>
        <PostBlog />
        Hello blog!
      </div>
    )
  }
}

export default Blog;
