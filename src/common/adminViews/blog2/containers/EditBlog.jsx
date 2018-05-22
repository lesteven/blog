import React, { Component, Fragment } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

/*
* EditBlog retrieves own data from reselect
* so once it is edited, it will only render itself
* and not other components.
*/
class EditBlog extends Component {
  
  render() {
  console.log(this.props);
//  console.log(this.props.data);
    return (
      <div>hello</div>
    )
  }
}

const getData = createSelector(
  (data, props) => props.id,
  (data) => data,
  (id, data) => data
    .filter(blog => blog._id === id)[0]
)

const mapState  = ({ richEditor }, ownProps) => ({
  data: getData(richEditor.converted, ownProps) 
})

//export default EditBlog;
export default connect(mapState)(EditBlog);

