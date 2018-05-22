import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PostBlog from './PostBlog';
import EditContainer from './EditContainer';

/*
* Pass down this.props (history) to edit blogs
* so EditContainer can access url when fetching data
*/
class Blog extends Component {

  render() {
    return (
      <Fragment>
        <PostBlog />
        <EditContainer { ...this.props }/>
      </Fragment>
    )
  }
}

export default Blog;
