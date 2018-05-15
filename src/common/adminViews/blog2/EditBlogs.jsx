import React,{Component} from 'react';
import { connect } from 'react-redux';
import Paginate from '../../sharedViews/paginate/Paginate.jsx';
import {
        postStatus,
        updateEditor,
        asyncBlogFetch } from '../../reduxModules/richEditorModule';
import EditBlog from './components/EditBlog.jsx';
import {Editor, EditorState, RichUtils,convertToRaw} from 'draft-js';
import {updateInput,updateYT} from '../../reduxModules/richEditorModule';


class EditBlogs extends Component{
  componentDidMount(){
    const {fetchData,editorAct, asyncBlogFetch} = this.props;
    console.log(asyncBlogFetch);
    asyncBlogFetch(`/api/editor/data/${location.search}`)
  }
  componentWillReceiveProps(nextProps){
    const { location } = this.props;
    if(nextProps.location.search !== location.search && 
      !nextProps.editor.converted.delete){
      asyncFetchData(`/api/editor/data/${nextProps.location.search}`)
    }  
  }
  render(){
  const {path} = this.props.match;
  const {pagination,converted} = this.props.editor;
      return(
        <div className='dash-container'>
            <h1> Edit Blogs</h1>
        </div>
      )
  }

}

const mapStateToProps = ({richEditor, text}) => ({
  editor:richEditor,
  text,
});

const mapDispatchToProps = {
  asyncBlogFetch,
  updateEditor,	
  postStatus,
  updateInput,
  updateYT,
}
export default connect(mapStateToProps,mapDispatchToProps)(EditBlogs);
 


