import { combineReducers } from "redux";
import userReducer from "./userReducer";

//Combines reducers in one
export default combineReducers({
	userReducer: userReducer,
});
