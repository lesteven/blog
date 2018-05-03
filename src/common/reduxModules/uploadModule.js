import { postFile } from './fetchThunk.js';

// actions
const drop = '/redux/uploadModule/DROP';
const uploadFiles = '/redux/uploadModule/UPLOAD';


// action creators
export const dropAct = (data) => {
  return {
    type: drop,
    data
  }
}


export const uploadCB = status => {
  return {
    type:uploadFiles,
    status, 
  }
}

// thunk function
export const uploadAct = files => {
  return postFile('/admapi/upload', 'POST', files, uploadCB);
}

// initial state
const initialState = {
  files:[],
  accepted:[],
  rejected:[],
  status:''
}


// reducer
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
        status: action.status,
      }
    default:
      return state;
  }
}


