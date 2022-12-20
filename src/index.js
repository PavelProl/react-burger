import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./components/app/app";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

root.render((
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
));
