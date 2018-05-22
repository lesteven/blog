import React, { Component, Fragment } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import EditBlog from './EditBlog';


class EditBlogList extends Component {

  render() {
  const { ids } = this.props.richEditor;
  console.log(ids);
    return (
      <Fragment>
        { ids.map(id => <EditBlog key={ id } id = { id }/> )}
      </Fragment>
    )
  }
}

const getBlog = createSelector(
  (richEditor) => richEditor.ids, 
  (richEditor) => richEditor.converted,
  (id, data) => data.map(id => {
    return { id }
  })
);

const mapState = ({ richEditor }) => ({
//  editData: getBlog(richEditor)
  richEditor
})

export default connect(mapState)(EditBlogList);
