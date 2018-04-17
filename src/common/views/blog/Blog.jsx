import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchData,postData} from '../../reduxModules/fetchThunk';
import Paginate from '../../sharedViews/paginate/Paginate.jsx';
import {editorAct} from '../../reduxModules/editorModule';
import {Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';
import {styleMap,
        getBlockStyle,
        mediaBlockRenderer} from '../../sharedViews/blogComponents/editorStyle.js';


class Blog extends Component{
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
        let className = 'RichEditor-editor';
        const {converted} = this.props.editor;
        return converted.map(e => 
            <div key = {e._id} className='RichEditor-root'>
                <div className={className}>
                <Editor
                    editorState={e.editor}
                    blockStyleFn={getBlockStyle}
                    blockRendererFn={mediaBlockRenderer}
                    customStyleMap={styleMap}
                    readOnly={true}
                />
                </div>
                <p className='date'>{new Date(e.createdAt).toDateString()}</p>
            </div>
        )
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
    const {converted, db} = this.props.editor;
        return(
            <div className='mainBlogs'>
                {converted?this.list():null}         
                {converted? <Paginate page = {db.page} path = {path} 
                    modelID={this.blogID}/> 
                    :null}
            </div>
        )
    }

}

const mapStateToProps = (state) =>{
	return{
		editor:state.editor
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		fetchData:(url,actFunc)=>dispatch(fetchData(url,actFunc)),
		postData:(url,method,data,actFunc)=>
            dispatch(postData(url,method,data,actFunc)),
		editorAct:(editor)=>dispatch(editorAct(editor))	
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Blog);
