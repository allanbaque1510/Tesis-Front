import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./erroresLoginReducer";
import loadingState from "./loadingState";
const rootReducer = combineReducers({
  user: userReducer,
  errorLogin: errorReducer,
  loading: loadingState,
});

export default rootReducer;
