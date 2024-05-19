const initialState = {
  usuario: null,
  autenticado: false,
  loading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        usuario: null,
        autenticado: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
