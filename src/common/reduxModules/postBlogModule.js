import {Editor, 
        EditorState, 
        RichUtils,
        convertToRaw,
        convertFromRaw} from 'draft-js';


const convertAct = 'CONVERT_DATA';

// action
export function convertData() {
    return {
      type: convertAct,
    }
}
export function updateOne(editor) {
    return {
        type: 'UPDATE_ONE',
        editor
    }
}   
export function updateImage(id,input) {
    return {
        type: 'UPDATE_ONE_IMAGE',
        input
    }
}

export function updateYT(id,input) {
    return {
        type: 'UPDATE_ONE_YT',
        input
    }
}
export function postStatus(status){
//    console.log(status);
    return{
        type: 'ONE_STATUS',
        status
    }
}

const rawData = {
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: [],
    },
  ],
};


// initial state
let initialState = {
    editor: rawData,
    imgURL: "",
    youtube:"",
    converted: false,
}

// reducer 
export const postBlog = (state = initialState, action) => {
    const {editor, status} = action;
    switch (action.type) {
        case convertAct:
            return {
              ...state,
              editor: EditorState.createWithContent(
                convertFromRaw(state.editor)),
              converted: true,

            }
        case 'UPDATE_ONE':    
            return {
                ...state,
                editor 
            }
        case 'UPDATE_ONE_IMAGE':
            return {
                ...state,
                imgURL: action.input
            }
        case 'UPDATE_ONE_YT':
            return {
                ...state,
                youtube: action.input
            }
        case 'ONE_STATUS':
            return{
                ...state,
                status,
                editor: EditorState.createEmpty()
                }
        default:
            return state;
    }
}


export default postBlog;
