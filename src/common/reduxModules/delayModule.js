// actions
const delay = 'app/view/DELAY';


// action creators

export const delayAC = () => {
  return {
    type: delay,
  }
}

// initial state

const initialState = { render: false }


// reducers

export const delayReducer = (state = initialState, action) => {
    switch (action.type) {
      case delay:
        return {
          render: true
        } 
      default:
        return state;
    }
}
