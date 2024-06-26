export const login = (usuario) => {
  return {
    type: "LOGIN",
    payload: usuario,
  };
};
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const setErrorLogin = (error) => ({
  type: "SET_ERROR",
  payload: error,
});

export const clearErrorLogin = () => ({
  type: "CLEAR_ERROR",
});
export const loadingOn = () => ({
  type: "LOADING_ON",
});

export const loadingOff = () => ({
  type: "LOADING_OFF",
});

export const activarModalResult = (datos) => ({
  type: "MODAL_RESULT_ON",
  payload: datos,
});

export const ocultarModalResult = () => ({
  type: "MODAL_RESULT_OFF",
});
