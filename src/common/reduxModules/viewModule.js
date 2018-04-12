const updateView = 'app/view/UPDATE_SCREEN_SIZE';
const toggleNav = 'app/view/TOGGLE_NAV';
const toggleDashSide = 'app/view/TOGGLE_DASH_NAV';


// -----------------------------------------------------------//
// css state based on screen width
const maxSize = 812;

const showFlex = size => (size < maxSize ? 'none' : 'flex');

const showBlock = size => (size < maxSize ? 'none' : 'block');

// toggle display
// if display is less than maxsize and 
// is none -> change to flex
// else if it's flex -> change to none
const toggleFlex = (size, display) => {
  if (size < maxSize) {
    return display === 'none' ? 'flex' : 'none';
  }
  return 'flex';
};

/*
const toggleBlock = (size, display) => {
  if (size < maxSize) {
    return display === 'none' ? 'block' : 'none';
  }
  return 'block';
};
*/

// -----------------------------------------------------------//


// action creator
export const updateScreenSize = size => ({
  type: updateView,
  screenSize: size,
});

export const toggleLinks = () => ({
  type: toggleNav,
});

export const toggleDashSideNav = () => ({
  type: toggleDashSide,
});


// initial state
const initialState = {
  screenSize: typeof window === 'object' ? window.innerWidth : null,

};



// reducer
export const view = (state = initialState, action) => {
  switch (action.type) {
    case updateView:
      return {
        ...state,
        screenSize: action.screenSize,
        showBlock: showBlock(action.screenSize),
        showNav: showFlex(action.screenSize),
        showDashSideNav: showFlex(action.screenSize),
      };
    case toggleNav:
      return {
        ...state,
        showNav: toggleFlex(state.screenSize, state.showNav),
      };
    case toggleDashSide:
      return {
        ...state,
        showDashSideNav: toggleFlex(state.screenSize, state.showNav),
      };
    default:
      return state;
  }
};


export default view;
