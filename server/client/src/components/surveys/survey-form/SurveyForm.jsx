import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";

import SurveyField from "../survey-field/SurveyField";

const FIELDS = [
  {
    name: "title",
    label: "Survey Title",
  },
  {
    name: "subject",
    label: "Subject Line",
  },
  {
    name: "body",
    label: "Email Body",
  },
  {
    name: "emails",
    label: "Recipient List",
  },
];

const SurveyForm = (props) => {
  const renderFields = () =>
    FIELDS.map((field) => (
      <Field key={field.name} {...field} type="text" component={SurveyField} />
    ));

  return (
    <div>
      <form onSubmit={props.handleSubmit((value) => console.log(value))}>
        {renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
          <i className="material-icons right">cancel</i>
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">navigate_next</i>
        </button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "surveyForm",
})(SurveyForm);
