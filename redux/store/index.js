import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reduxReducer from "../reducers";

export default createStore(reduxReducer, applyMiddleware(thunk, logger));
