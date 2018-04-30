import { postFile } from './fetchThunk.js';

// actions
const drop = '/redux/uploadModule/DROP';
const uploadFiles = '/redux/uploadModule/UPLOAD';


// action creators

export const dropAct = (files) => {
  return {
    type: drop,
    files
  }
}

export const uploadAct = files => {
  let status = postFile('/admapi/upload', 'POST', files);
  return {
    type:uploadFiles,
    status 
  }
}
const initialState = {
  files: [],

}

export const upload = (state = initialState, action) => {
  switch (action.type) {
    case drop:
      return {
        ...state,
        files: action.files,
      }
    case uploadFiles:
      return {
        ...state,
        uploaded: action.files,
      }
    default:
      return state;
  }
}

