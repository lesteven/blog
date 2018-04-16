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
/*
import BlockStyleControls from './components/BlockStyleControls.jsx';
import InlineStyleControls from './components/InlineStyleControls.jsx';
import TextInput from './components/TextInput.jsx';
import { postData } from '../../reduxModules/fetchThunk';
*/


/*
  * Converted data cannot be created in redux store b/c JSON.stringify 
  * in the server does not copy __proto__ from redux, therefore it will not
  * correctly render Draftjs.
  * To get around this, we create the draftjs data when the component is 
  * mounted, and then render Draftjs. (data is still created in redux, just
  * not stringified, which therefore would allow it to work)
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
    componentDidMount() {
      console.log('did mount called');
      const { convertData } = this.props;
      convertData(); 
    }
    render() {
    let {editor, youtube, imgURL, status, converted} = this.props.postBlog;
        return (
            <div className='dash-container'>
                <div className='RichEditor-root'>
                   { converted? 
                    <RichEditor
                        editor = { editor }
                        onChange = { this.props.updateOne }  
                    />
                    :null }
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
        convertData: () => dispatch(convertData()),
        updateOne: (editor) => dispatch(updateOne(editor)),
        updateImage:(id,input)=>dispatch(updateImage(id,input)),
        updateYT:(id,input)=>dispatch(updateYT(id,input)),
		postData:(url,meth,data,func)=>dispatch(postData(url,meth,data,func)),
        postStatus:(status)=>dispatch(postStatus(status))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostBlog);
