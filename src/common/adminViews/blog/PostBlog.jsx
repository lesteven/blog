import React,{Component} from 'react';
import {AtomicBlockUtils, 
        Editor, 
        EditorState, 
        RichUtils,
        convertToRaw} from 'draft-js';
import { connect } from 'react-redux';
import {updateOne,
        updateImage,
        updateYT,
        postStatus} from '../../reduxModules/postBlogModule';

import RichEditor from './components/RichEditor.jsx';
/*
import BlockStyleControls from './components/BlockStyleControls.jsx';
import InlineStyleControls from './components/InlineStyleControls.jsx';
import TextInput from './components/TextInput.jsx';
import { postData } from '../../reduxModules/fetchThunk';
*/

class PostBlog extends Component {
/*
    toggleBlockType=(blockType)=> {
      this.props.updateOne(
        RichUtils.toggleBlockType(
          this.props.postBlog.editor,
          blockType
        )
      );
    }
    toggleInlineStyle=(inlineStyle)=>{
      this.props.updateOne(
        RichUtils.toggleInlineStyle(
          this.props.postBlog.editor,
          inlineStyle
        )
      );
    }
    confirmMedia=(type,content)=>{
        const {editor} = this.props.postBlog;
//        console.log('confirm!',type,content);
        const contentState = editor.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            type,
            'IMMUTABLE',
            {src: content}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editor,
            {currentContent: contentStateWithEntity}
            );
        const newReduxState = AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' '
        )    
        this.props.updateOne(newReduxState);
    }
    addImage=(blog)=>{
        const content = this.props.postBlog.imgURL;
        this.confirmMedia('image',content);
    }
    addYouTube=(blog)=>{
        const youtube = this.props.postBlog.youtube;
        const vidURL = 'https://www.youtube.com/embed/' 
                + youtube.split('com\/watch?v=')[1];
        const check = vidURL.split('&');
        console.log(check);
        this.confirmMedia('youtube',check[0]);
    }

    postData=()=>{
        const {postBlog,postData,postStatus} = this.props;
        const {editor} = postBlog;

        var contentState = editor.getCurrentContent();
        var data = {editor:JSON.stringify(convertToRaw(contentState))};
        postData('/api/editor','POST',data,postStatus);
    }
*/
    render() {
    const {editor, youtube, imgURL, status} = this.props.postBlog;
    const blog = {_id:0};
        return (
            <div className='dash-container'>
                <div className='RichEditor-root'>
                    <RichEditor
                        editor = { editor }
                        onChange = {this.props.updateOne}  
                    />
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {postBlog} = state;
    return {
        postBlog
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        updateOne: (editor) => dispatch(updateOne(editor)),
        updateImage:(id,input)=>dispatch(updateImage(id,input)),
        updateYT:(id,input)=>dispatch(updateYT(id,input)),
		postData:(url,meth,data,func)=>dispatch(postData(url,meth,data,func)),
        postStatus:(status)=>dispatch(postStatus(status))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostBlog);
