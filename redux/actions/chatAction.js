import { GET } from "../../utils/requests";
import { APPEND_CHAT_MESSAGE, SET_CHAT_BY_ID_DATA } from "../types";

const chatActions = {
  loadData: (id) => async (disptach, getState) => {
    disptach({ type: SET_CHAT_BY_ID_DATA, data: { loading: true } });
    const data = await GET("/" + id);
    disptach({
      type: SET_CHAT_BY_ID_DATA,
      data,
    });
  },
  pushMessage: (data) => (dispatch) => {
    dispatch({
      type: APPEND_CHAT_MESSAGE,
      data,
    });
  },
};

export default chatActions;
