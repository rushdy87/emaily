// in the root reducer we combine all reducers - that we code, or we used by third part library

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form"; /*
The store should know how to handle actions coming from the form components.
To enable this, we need to pass the formReducer to your store. It serves for
all of your form components, so you only have to pass it once. */

import { authReducer } from "./auth/authReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
});
