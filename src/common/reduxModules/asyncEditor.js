import {Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';

import { fetchData } from './asyncFetch';



const editorData = 'redux/asyncEditor/EDITOR_DATA';

//action
export function asyncEditorAct(url){
	return async function(dispatch) {
    let res = await fetchData(url).catch(err => console.log('error')); 

    let data = await res.json();

    dispatch({
      type: editorData,
      editor:data,
    });

	}

}
export function postStatus(status){
    return{
        type: 'STATUS',
        status
    }
}
/******* editor action **********/
export function updateEditor(id,editorState){
    return{
        type:'UPDATE',
        id,
        editorState       
    }
}
export function handleKeyCommand(id){
    return{
        type:'HANDLE_KEY',
        id,
    }
}

/*******************************************/

// reducer
export const asyncEditor =(state={},action)=>{
    const {editor,status} = action;
	switch(action.type){
		case editorData:
			return {

                ...state,
                db: editor,
                converted: editor.data?convert(editor.data):null

                }
    case 'STATUS':
        return{
            ...state,
            converted:state.converted.map(blog =>
            (blog._id == status.id)
                ? {...blog, status}
                :blog)
            }
    case 'UPDATE':
        return {
            ...state,
            converted:state.converted.map(blog =>
            (blog._id == action.id)
                ? {...blog, editor:action.editorState}
                :blog
            )}
    case 'UPDATE_INPUT':
        return {
            ...state,
            converted:state.converted.map(blog =>
                (blog._id == action.id)
                    ? {...blog, imgURL:action.input}
                    :blog
            )}
    case 'UPDATE_YT':
        return {
            ...state,
            converted:state.converted.map(blog =>
                (blog._id == action.id)
                    ? {...blog, youTube:action.input}
                    :blog
            )}
		default:
			return state;
	}
}
// state modifiers
const convert =(data)=>{
    const editorData = [...data];
    return  editorData.map(blog =>
        ({ ...blog,
            editor:EditorState.createWithContent(
                convertFromRaw(JSON.parse(blog.editor))),
            imgURL:'',
            youTube:'',
        })
    )
}


