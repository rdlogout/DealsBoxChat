import { SET_INDEX_CHAT_DATA } from "../types";

const initialState = {
  loading: true,
  chatItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INDEX_CHAT_DATA:
      return action.data;
    default:
      return state;
  }
};
