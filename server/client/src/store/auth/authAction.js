import axios from "axios";

import { FETCH_USER } from "./authTypes";

export const fetchUser = () => {
  return function (dispatch) {
    axios
      .get("/api/current_user")
      .then((res) => dispatch({ type: FETCH_USER, payload: res.data }))
      .catch((error) => console.log(error));
  };
};
/*
Dispatch sends the action to all the different reducers in the store,
causing them to instantly recalculate the app state
 */
