import { rootReducer } from "../services/reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);
