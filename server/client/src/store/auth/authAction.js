import axios from "axios";

import { FETCH_USER } from "./authTypes";

export const fetchUser = () => async (dispatch) => {
  try {
    const user = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: user.data });
  } catch (error) {
    console.log(error);
  }
};
/*
Dispatch sends the action to all the different reducers in the store,
causing them to instantly recalculate the app state
 */

export const handleToken = (token) => async (dispatch) => {
  try {
    const updatedUser = await axios.post("/api/stripe", token);
    dispatch({ type: FETCH_USER, payload: updatedUser.data });
  } catch (error) {
    console.log(error);
  }
};
