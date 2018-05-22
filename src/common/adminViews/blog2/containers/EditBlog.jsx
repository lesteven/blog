import React, { Component, Fragment } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';


class EditBlog extends Component {
  
  render() {
  console.log(this.props);
    return (
      <div>hello</div>
    )
  }
}

const getData = createSelector(

)

const mapState  = (state, ownProps) => ({
  data: getData(state, ownProps) 
})

export default EditBlog;
