import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FIELDS } from "../formFields";
import { submitSurvey } from "../../../store/survey/surveysAction";

const SurveyFormReview = ({ onCancel }) => {
  const formValues = useSelector((state) => state.form.surveyForm.values);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <h3>Please confirm your enteries:</h3>
      <ul className="collection with-header">
        {FIELDS.map(({ name, label }) => (
          <li className="collection-item" key={name}>
            <h5 className="teal-text text-lighten-2">{label}:</h5>
            <div>{formValues[name]}</div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="teal btn-flat left white-text"
        onClick={onCancel}
      >
        Back
        <i className="material-icons right">navigate_before</i>
      </button>
      <button
        type="button"
        className="teal btn-flat right white-text"
        onClick={() => dispatch(submitSurvey(formValues, navigate))}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default SurveyFormReview;
