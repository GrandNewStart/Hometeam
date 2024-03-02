// Action Types
export const SHOW_PROGRESS_BAR = 'SHOW_PROGRESS_BAR';
export const HIDE_PROGRESS_BAR = 'HIDE_PROGRESS_BAR';

// Action Creators
export const showProgressBar = () => ({
  type: SHOW_PROGRESS_BAR,
});

export const hideProgressBar = () => ({
  type: HIDE_PROGRESS_BAR,
});

const initialState = {
    isLoading: false,
};
  
  const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHOW_PROGRESS_BAR:
        return { ...state, isLoading: true };
      case HIDE_PROGRESS_BAR:
        return { ...state, isLoading: false };
      default:
        return state;
    }
  };
  
  export default loadingReducer;
  