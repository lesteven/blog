// actions

const scrollAct = '/redux/scrollModule/SCROLL';

// action creators

export const scrollAC = (diff, client) => {
  return {
    type: scrollAct,
    diff,
    client
  }
}

// initial state
let initialState = {
  diff:'',
  client:'',
  endOfPage:'',
};

// reducers

export const scroll = (state= initialState, action) => {
  switch (action.type) {
    case scrollAct:
      return {
        ...state,
        diff: action.diff,
        client: action.client,
        endOfPage: action.diff === action.client,
      };
    default:
      return state;
  }
}
