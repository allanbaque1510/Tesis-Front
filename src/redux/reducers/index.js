import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./erroresLoginReducer";
import loadingState from "./loadingState";
import modalResultReducer from "./modalResultReducer";
const rootReducer = combineReducers({
  user: userReducer,
  errorLogin: errorReducer,
  loading: loadingState,
  modalResult: modalResultReducer,
});

export default rootReducer;
