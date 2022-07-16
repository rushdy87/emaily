import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk"; /* thunks" are a pattern of writing functions with
logic inside that can interact with a Redux store's dispatch and getState methods. */

import reducers from "./rootReducer";

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));
