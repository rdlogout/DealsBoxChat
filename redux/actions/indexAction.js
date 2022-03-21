import { GET } from "../../utils/requests";
import { SET_INDEX_CHAT_DATA } from "../types";

const indexActions = {
  loadData: () => async (disptach, getState) => {
    const data = await GET("/");
    disptach({
      type: SET_INDEX_CHAT_DATA,
      data: {
        loading: false,
        chatLists: data,
      },
    });
  },
};

export default indexActions;
