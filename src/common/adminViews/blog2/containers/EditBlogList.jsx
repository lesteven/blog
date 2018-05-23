import React, { Component, Fragment } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import EditBlogWrapper from './EditBlogWrapper';


class EditBlogList extends Component {

  render() {
//  const { ids } = this.props.richEditor;
  const ids = this.props.editData;
  
    return (
      <Fragment>
        { ids? 
          ids.map(id => <EditBlogWrapper key={ id } id = { id }/> )
          :null}
      </Fragment>
    )
  }
}

const getBlog = createSelector(
  (richEditor) => richEditor.ids, 
  (id) =>  (id)
);

const mapState = ({ richEditor }) => ({
  editData: getBlog(richEditor)
//  richEditor
})

export default connect(mapState)(EditBlogList);
