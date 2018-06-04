import { postFile } from './fetchThunk.js';
import { fetchData } from './asyncFetch';

// actions
const fetching = '/redux/uploadModule/FETCHING';
const drop = '/redux/uploadModule/DROP';
const uploadFiles = '/redux/uploadModule/UPLOAD';
const getFiles = '/redux/uploadModule/FETCHED';


// action creators
export const fetchingData = () => ({
  type: fetching
})
export const fetchedData = (data) => ({
  type: getFiles,
  data
})
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
    console.log('async fetch image called');
    return async function(dispatch) {
      dispatch(fetchingData());

      let res = await fetchData(url)
                .catch(err => console.log('res error'));
      let data = await res.json()
                .catch(err => console.log('data error'));

      dispatch(fetchedData(data));      

    }
}

// thunk function
export const uploadAct = files => {
  return postFile('/admapi/upload', 'POST', files, uploadCB);
}

// initial state
const initialState = {
  fetchingData:false,
  fetchedFiles:[],
  accepted:[],
  rejected:[],
  status:''
}


// reducer
export const upload = (state = initialState, action) => {
  let { data } = action;
  switch (action.type) {
    case fetching:
      return {
        ...state,
        fetchingData: true
      }
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
        fetchingData: false,
        fetchedFiles: action.data,
      } 
    default:
      return state;
  }
}

