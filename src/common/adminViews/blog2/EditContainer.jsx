import React,{ Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Paginate from '../../sharedViews/paginate/Paginate.jsx';
import { postStatus,
         updateEditor,
         asyncBlogFetch } from '../../reduxModules/richEditorModule';
import EditBlog from './components/EditBlog.jsx';
import {Editor, EditorState, RichUtils,convertToRaw} from 'draft-js';
import { updateInput,
         updateYT} from '../../reduxModules/richEditorModule';
import EditBlogList from './containers/EditBlogList';
import EditPaginate from './containers/EditPaginate';


class EditContainer extends Component{
  componentDidMount(){
    const { asyncBlogFetch } = this.props;
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
  //const {pagination,converted} = this.props.editor;
    return(
      <Fragment>
        <h1> Edit Blogs</h1>
        <EditBlogList />
        <EditPaginate />
      </Fragment>
    )
  }

}


const mapDispatchToProps = {
  asyncBlogFetch,
  updateEditor,	
  postStatus,
  updateInput,
  updateYT,
}


export default connect(null,mapDispatchToProps)(EditContainer);
 


