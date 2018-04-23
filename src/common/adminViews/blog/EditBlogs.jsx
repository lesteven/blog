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
        if(nextProps.location.search !== location.search){
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
        const {data} = this.props.editor.db;
        if(data[0]){
            let obj ={};
            let blog = data;
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
    const {db,converted} = this.props.editor;
        return(
            <div className='dash-container'>
                <h1> Edit Blogs</h1>
				{converted? this.list():null}
                {converted? <Paginate page = {db.page} path = {path} 
                    modelID={this.blogID}/> 
                    :null}
            </div>
        )
    }

}

const mapStateToProps = (state) =>{
	return{
		editor:state.editor,
        text:state.text,
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		postData:(url,method,data,actFunc)=>
            dispatch(postData(url,method,data,actFunc)),
		editorAct:(editor)=>dispatch(editorAct(editor)),
        updateEditor:(id,state)=>dispatch(updateEditor(id,state)),	
        postStatus:(status)=>dispatch(postStatus(status)),
        updateInput:(id,input)=>dispatch(updateInput(id,input)),
        updateYT:(id,input)=>dispatch(updateYT(id,input))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(EditBlogs);
 


