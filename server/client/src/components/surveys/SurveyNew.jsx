import { useState } from "react";
import { reduxForm } from "redux-form";

import SurveyForm from "./survey-form/SurveyForm";
import SurveyFormReview from "./survey-form-review/SurveyFormReview";

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);
  return (
    <div>
      {showFormReview ? (
        <SurveyFormReview onCancel={() => setShowFormReview(false)} />
      ) : (
        <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />
      )}
    </div>
  );
};
export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
