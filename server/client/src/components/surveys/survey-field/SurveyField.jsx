import "./surveyField.css";

const SurveyField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div className="survey-field-container">
      <label>{label}</label>
      <input {...input} />
      <div className="survey-field-validate red-text text-darken-1">
        {touched && <span>{error}</span>}
      </div>
    </div>
  );
};

export default SurveyField;
