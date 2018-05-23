import React, { Component, Fragment } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import EditBlog from '../components/EditBlog';
import { editorAct,
        postStatus,
        updateEditor } from '../../../reduxModules/richEditorModule';

/*
* EditBlogWrapper retrieves own data from reselect
* so once it is edited, it will only render itself
* and not other components.
*/


class EditBlogWrapper extends Component {
  
  render() {
  console.log(this.props);
//  console.log(this.props.data);
  const { data, updateEditor } = this.props;
    return (
      <EditBlog
        blog = { data } 
        update = { updateEditor }
        />
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

const mapDispatchToProps = {
  updateEditor,
}
//export default EditBlogWrapper;
export default connect(mapState, mapDispatchToProps)(EditBlogWrapper);

