import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";

import SurveyField from "../survey-field/SurveyField";
import { validateEmails } from "../../../utils/validateEmal";
import { FIELDS } from "../formFields";

const SurveyForm = (props) => {
  const renderFields = () =>
    FIELDS.map((field) => (
      <Field key={field.name} {...field} type="text" component={SurveyField} />
    ));

  return (
    <div>
      <form onSubmit={props.handleSubmit(props.onSurveySubmit)}>
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

const validate = (values) => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}.`;
    }
  });
  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);

/*
the flow of validate:
1- in validate function:
  if errors object is empty that mean there is no error.
  if errors has a proprty, that mean there is an error in Field component that have the same name with errors.proprty.
2- reduxForm add an error proprty to the the Field component as props:
  if there is a key in errors object (in validate function), take its value in error prop.
  else error will be undifine 
3- in the SurveyField check:
  if error prop is undifine that mean every think is Ok.
  if There is a value in the error prop, then show the value of it.

 */
