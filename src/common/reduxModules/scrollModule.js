// actions

const scrollAct = '/redux/scrollModule/SCROLL';

// action creators

export const scrollAC = (height) => {
  return {
    type: scrollAct,
    height
  }
}

// initial state
let initialState = {};

// reducers

export const scroll = (state= initialState, action) => {

  switch (action) {
    case scrollAct:
      return '';
    default:
      return state;
  }
}
