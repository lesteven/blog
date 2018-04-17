import React,{Component} from 'react';
import {AtomicBlockUtils, 
        Editor, 
        EditorState, 
        RichUtils,
        convertFromRaw,
        convertToRaw} from 'draft-js';
import { connect } from 'react-redux';
import {convertData,
        updateOne,
        updateImage,
        updateYT,
        postStatus} from '../../reduxModules/postBlogModule';

import RichEditor from './components/RichEditor.jsx';

import BlockStyleControls from './components/BlockStyleControls.jsx';
import InlineStyleControls from './components/InlineStyleControls.jsx';
import TextInput from './components/TextInput.jsx';
import { postData } from '../../reduxModules/fetchThunk';



/*
  * Converted data cannot be created in redux store b/c JSON.stringify 
  * in the server does not copy __proto__ from redux, therefore it will not
  * correctly render Draftjs.
  * To get around this, we create the draftjs data when the component is 
  * mounted, and then render Draftjs. (data is still created in redux, just
  * not stringified, which therefore would allow it to work)
*/


class PostBlog extends Component {

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
    componentDidMount() {
      const { converted } = this.props.postBlog;
      if (!converted) {
        console.log('did mount called');
        const { convertData } = this.props;
        convertData(); 
      }
    }
    render() {
    const {editor, youtube, imgURL, status, converted} = this.props.postBlog;
    const blog = {_id:0};
        return (
            <div className='dash-container'>
               { converted? 
                <div className='RichEditor-root'>
                    <BlockStyleControls editorState={editor}
                        onToggle={this.toggleBlockType}/>
                    <InlineStyleControls editorState={editor}
                        onToggle={this.toggleInlineStyle}/>
                    <TextInput 
                        updateInput ={this.props.updateImage}
                        inputValue ={imgURL}
                        data ={blog}
                        onSubmit={this.addImage}
                        buttonText='Add Image'
                        />
                    <TextInput
                        updateInput ={this.props.updateYT}
                        inputValue ={youtube}
                        data ={blog}
                        onSubmit={this.addYouTube}
                        buttonText='Add Video'
                        />
                    <RichEditor
                        editor = { editor }
                        onChange = { this.props.updateOne }  
                    />
                    <div className='editorButton'>
                        <button onClick={this.postData}>
                            Post</button>   
                    </div>
                </div>
                    :null }
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
        convertData: () => dispatch(convertData()),
        updateOne: (editor) => dispatch(updateOne(editor)),
        updateImage:(id,input)=>dispatch(updateImage(id,input)),
        updateYT:(id,input)=>dispatch(updateYT(id,input)),
		postData:(url,meth,data,func)=>dispatch(postData(url,meth,data,func)),
        postStatus:(status)=>dispatch(postStatus(status))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostBlog);
