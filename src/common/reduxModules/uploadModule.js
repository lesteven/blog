import { postFile } from './fetchThunk.js';
import { fetchData } from './asyncFetch';

// actions
const drop = '/redux/uploadModule/DROP';
const uploadFiles = '/redux/uploadModule/UPLOAD';
const getFiles = '/redux/uploadModule/GET';


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
// async fetch
export function asyncFetchImage(url) {
    return async function(dispatch) {
      let res = await fetchData(url).catch(err => console.log('error'));
      let data = await res.json();

      dispatch({
        type: getFiles,
        data
      });      

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
    case getFiles:
      return {
        ...state,
        files: action.data,
      } 
    default:
      return state;
  }
}

