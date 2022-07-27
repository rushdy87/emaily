import axios from "axios";

import { FETCH_USER } from "../auth/authTypes";
import { FETCH_SURVEYS } from "./surveysTypes";

export const submitSurvey = (values, navigate) => async (dispatch) => {
  try {
    const res = await axios.post("/api/surveys", values);
    navigate("/surveys");
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSurveys = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/surveys");

    dispatch({ type: FETCH_SURVEYS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
