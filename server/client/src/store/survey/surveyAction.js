import axios from "axios";

import { FETCH_USER } from "../auth/authTypes";

export const submitSurvey = (values, navigate) => async (dispatch) => {
  try {
    const res = await axios.post("/api/surveys", values);
    navigate("/surveys");
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
