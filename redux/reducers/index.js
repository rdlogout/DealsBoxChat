import { combineReducers } from "redux";
import chatReducer from "./chatReducer";
import indexReducer from "./indexReducer";

export default combineReducers({
  index: indexReducer,
  chat: chatReducer,
});
