import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PostBlog from './PostBlog';
import EditBlogs from './EditBlogs';

/*
* Pass down this.props (history) to edit blogs
* so EditBlogs can access url when fetching data
*/
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
