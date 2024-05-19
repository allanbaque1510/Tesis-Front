const initialState = {
  loading: false,
};

const loadingState = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_ON":
      return {
        ...state,
        loading: true,
      };
    case "LOADING_OFF":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default loadingState;
