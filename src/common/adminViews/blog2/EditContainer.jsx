import React,{ Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { postStatus,
         asyncBlogFetch } from '../../reduxModules/richEditorModule';
import EditBlogList from './containers/EditBlogList';
import EditPaginate from './containers/EditPaginate';


class EditContainer extends Component{
  componentDidMount(){
    const { asyncBlogFetch } = this.props;
    asyncBlogFetch(`/api/editor/data/${location.search}`)
  }
  componentWillReceiveProps(nextProps){
    const { location, asyncBlogFetch } = this.props;
//    console.log(this.props);
    if(nextProps.location.search !== location.search){
      asyncBlogFetch(`/api/editor/data/${nextProps.location.search}`)
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
  postStatus,
}


export default connect(null,mapDispatchToProps)(EditContainer);
 

