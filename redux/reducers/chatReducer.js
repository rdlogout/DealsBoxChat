import { APPEND_CHAT_MESSAGE, SET_CHAT_BY_ID_DATA } from "../types";

const initialState = {
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_BY_ID_DATA:
      return action.data;
    case APPEND_CHAT_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.data],
      };
    default:
      return state;
  }
};
