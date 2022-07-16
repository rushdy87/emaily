import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; /*The <Provider> component makes the Redux store
available to any nested components that need to access the Redux store. */
import "materialize-css/dist/css/materialize.min.css";

import App from "./App";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
