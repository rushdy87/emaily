import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { fetchSurveys } from "../../../store/survey/surveysAction";

const SurvesList = () => {
  const dispatch = useDispatch();
  const surves = useSelector(({ surveys }) => surveys);
  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  const renderSurveys = () => {
    return surves.reverse().map((surve) => (
      <div key={surve._id} className="card blue-grey darken-2">
        <div className="card-content white-text">
          <span className="card-title">{surve.title}</span>
          <p>{surve.body}</p>
          <p className="right">
            Sent on: {new Date(surve.dateSent).toLocaleDateString()}
          </p>
        </div>
        <div className="card-action">
          <span className="yellow-text darken-1">YES: {surve.yes}</span>
          <span className="white-text"> | </span>
          <span className="yellow-text darken-1">NO: {surve.no}</span>
        </div>
      </div>
    ));
  };

  return <div>{renderSurveys()}</div>;
};

export default SurvesList;
