import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PostBlog from './PostBlog';
import EditBlogs from './EditBlogs';


class Blog extends Component {

  render() {
    return (
      <Fragment>
        <PostBlog />
        <EditBlogs { ...this.props }/>
      </Fragment>
    )
  }
}

export default Blog;
