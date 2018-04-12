// actions
const delay = 'app/view/DELAY';


// action creators

export const delayAC = (value) => {
  return {
    type: delay,
    key: value
  }
}

// initial state

const initialState = { renderAdmin: false }


// reducers

export const delayReducer = (state = initialState, action) => {
    switch (action.type) {
      case delay:
        return {
          [action.key]: true
        } 
      default:
        return state;
    }
}
