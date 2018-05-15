import React,{Component} from 'react';
import { connect } from 'react-redux';
import { fetchData, postData } from '../../reduxModules/fetchThunk';
import Paginate from '../../sharedViews/paginate/Paginate.jsx';
import { editorAct,
        postStatus,
        updateEditor } from '../../reduxModules/editorModule';
import EditBlog from './components/EditBlog.jsx';
import {Editor, EditorState, RichUtils,convertToRaw} from 'draft-js';
import {updateInput,updateYT} from '../../reduxModules/editorModule';


class EditBlogs extends Component{
    componentDidMount(){
        const {fetchData,editorAct} = this.props;
        fetchData(`/api/editor/data/${location.search}`,editorAct)
    }
    componentWillReceiveProps(nextProps){
        const {fetchData,editorAct,location} = this.props;
        if(nextProps.location.search !== location.search && 
            !nextProps.editor.converted.delete){
          fetchData(`/api/editor/data/${nextProps.location.search}`,
                editorAct)
        }  
    }
    list(){
        const {converted} = this.props.editor;
        return converted.map(e =>
           <EditBlog key={e._id}
                blog={e} remove={this.delete} 
                update={this.props.updateEditor}
                put={this.put}
                updateInput={this.props.updateInput}
                inputValue={e.imgURL}
                updateYT={this.props.updateYT}
                vidValue={e.youTube}
                success={e.status}
            /> 
        )
    }
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
	blogID=()=>{
        const {converted} = this.props.editor;
        if(converted[0]){
            let obj ={};
            let blog = converted;
            obj.new = blog[0]._id;
            obj.old = blog[blog.length-1]._id;
            return obj;
        }
        else{
            return {};
        }
	}
    render(){
    const {path} = this.props.match;
    const {pagination,converted} = this.props.editor;
        return(
            <div className='dash-container'>
                <h1> Edit Blogs</h1>
				{converted? this.list():null}
                {converted? <Paginate page = {pagination} path = {path} 
                    modelID={this.blogID}/> 
                    :<p>there's nothing here!</p>}
            </div>
        )
    }

}

const mapStateToProps = ({richEditor, text}) => ({
  editor:richEditor,
  text,
});

const mapDispatchToProps = {
  fetchData,
  postData,
  editorAct,
  updateEditor,	
  postStatus,
  updateInput,
  updateYT,
}
export default connect(mapStateToProps,mapDispatchToProps)(EditBlogs);
 


