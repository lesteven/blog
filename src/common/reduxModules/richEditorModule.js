import {Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';
import { asyncFetchData } from './asyncFetch';


// action creators
export function editorAct(editor){
	return{
		type:'EDITOR',
		editor
	}
}
export function postStatus(status){
    return{
        type: 'STATUS',
        status
    }
}
// actions for image and youtube inputs
export function updateInput(id,input) {
    return {
        type: 'UPDATE_INPUT',
        id,
        input
    }
}

export function updateYT(id,input) {
    return {
        type: 'UPDATE_YT',
        id,
        input
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
export const richEditor =(state={},action)=>{
  const {editor,status} = action;
	switch(action.type){
		case 'EDITOR':
      return {
            ...state,
            pagination: editor.page,
            converted: editor.data?convert(editor.data):null,
            ids: editor.data? getIDs(editor.data): null,      
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


// fetch Data
export function asyncBlogFetch(url) {
  return (dispatch) => {
    asyncFetchData(dispatch, url, editorAct);

  };
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
// normalize data, get ids of blogs
const getIDs = data => {
  const editorData = [...data];
  return editorData.map(blog => blog._id);

}
