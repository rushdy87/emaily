import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; /*The <Provider> component makes the Redux store
available to any nested components that need to access the Redux store. */
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk"; /* thunks" are a pattern of writing functions with
logic inside that can interact with a Redux store's dispatch and getState methods. */

import "materialize-css/dist/css/materialize.min.css";

import App from "./App";
import reducers from "./store/rootReducer";

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
