import {
  SET_AUTH_DATA,
  SET_CART_DATA,
  SET_ZIP_DATA,
} from "../main-site/redux/types";
import { GET } from "./requests";

export const LoadAllState = async (dispatch) => {
  const resp = await GET("/state");
  if (!resp) return;

  dispatch({ type: SET_AUTH_DATA, data: resp.authdata });
  dispatch({ type: SET_CART_DATA, data: resp.cartdata });
  dispatch({ type: SET_ZIP_DATA, data: resp.zipdata });
};
