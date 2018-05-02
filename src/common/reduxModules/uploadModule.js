import { postFile } from './fetchThunk.js';

// actions
const drop = '/redux/uploadModule/DROP';
const uploadFiles = '/redux/uploadModule/UPLOAD';


// action creators
/*
export const dropAct = (files) => {
  return {
    type: drop,
    files
  }
}
*/
export const dropAct = (data) => {
  return {
    type: drop,
    data
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
  accepted:[],
  rejected:[],
}

export const upload = (state = initialState, action) => {
  let { data } = action;
  switch (action.type) {
    case drop:
      return {
        ...state,
        accepted:data.accepted,
        rejected:data.rejected,
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

