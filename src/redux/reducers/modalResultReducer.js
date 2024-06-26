const initialState = {
  active: false,
  success: null,
  title: "",
  message: "",
};

const modalResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MODAL_RESULT_ON":
      return {
        ...state,
        success: action.payload.success,
        title: action.payload.title,
        message: action.payload.message,
        active: true,
      };
    case "MODAL_RESULT_OFF":
      return {
        ...state,
        active: false,
        success: null,
        title: "",
        message: "",
      };
    default:
      return state;
  }
};

export default modalResultReducer;
