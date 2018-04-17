import React,{Component} from 'react';
import { connect } from 'react-redux';
import {AtomicBlockUtils,
        Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';
import BlockStyleControls from './BlockStyleControls.jsx';
import InlineStyleControls from './InlineStyleControls.jsx';
import {styleMap,
        getBlockStyle,
        mediaBlockRenderer} from './editorStyle.js';
import styles from './richEditor.css';


class RichEditor extends Component{
    focus = () => this.refs.editor.focus();
    handleKey=(command,editorState)=>{
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState){
            this.props.onChange(newState);
            return true;
        }
    }
    onTab =(e)=>{
        const maxDepth = 4;
        const {blog} = this.props;
        this.update(RichUtils.onTab(e,blog.editor,maxDepth));
    }
    render() {
    let className = 'RichEditor-editor Border';
    const {editor, onChange} = this.props;
        return(
            <div className={className} onClick={this.focus}>
                <Editor
                    editorKey = 'foobaz'
                    blockStyleFn={getBlockStyle}
                    blockRendererFn={mediaBlockRenderer}
                    customStyleMap={styleMap}
                    editorState = { editor }
                    onChange={ onChange }
                    handleKeyCommand={this.handleKey}
                    ref='editor'
                    spellCheck={true}
                    onTab={this.onTab}
                />
            </div>
        )
    }
}



export default RichEditor;
