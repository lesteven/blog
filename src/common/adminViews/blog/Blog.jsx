import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PostBlog from './PostBlog';

class Blog extends Component {

  render() {
    return (
      <Fragment>
        <PostBlog />
      </Fragment>
    )
  }
}

export default Blog;
