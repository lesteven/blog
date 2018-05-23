import React, { Component, Fragment } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import EditBlog from '../components/EditBlog';
import { editorAct,
        postStatus,
        updateEditor } from '../../../reduxModules/richEditorModule';
import {Editor, EditorState, RichUtils,convertToRaw} from 'draft-js';
import {updateInput,updateYT} from '../../../reduxModules/editorModule';
import { fetchData, postData } from '../../../reduxModules/fetchThunk';

/*
* EditBlogWrapper retrieves own data from reselect
* so once it is edited, it will only render itself
* and not other components.
*/


class EditBlogWrapper extends Component {
  delete=(data)=>{
      const id = data._id;
      const {postData,editorAct} = this.props;
      postData('/admapi/editor','DELETE',{_id:id},editorAct);
  }
  put=(data)=>{
//        console.log(data)
      const {postData,editorAct,postStatus} = this.props;
      var contentState = data.editor.getCurrentContent();
      let obj = {
          _id:data._id,
          editor:JSON.stringify(convertToRaw(contentState))
      }
      postData('/admapi/editor','PUT',obj,postStatus); 
  }
  
  render() {
  const { data, updateEditor, updateInput, updateYT } = this.props;
    return (
      <EditBlog
        blog = { data } 
        remove = { this.delete }
        update = { updateEditor }
        put = { this.put }
        updateInput = { updateInput }
        updateYT = { updateYT }
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
  fetchData,
  postData,
  editorAct,
  updateEditor,	
  postStatus,
  updateInput,
  updateYT,
}
//export default EditBlogWrapper;
export default connect(mapState, mapDispatchToProps)(EditBlogWrapper);

