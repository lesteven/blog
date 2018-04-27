// actions
const drop = '/redux/uploadModule/DROP';

// action creators

export const dropAct = (files) => {
  return {
    type: drop,
    files
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
    default:
      return state;
  }
}

