import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./components/app/app";
import { Provider } from "react-redux";
import { store } from "./services/store";
// import { rootReducer } from "./services/reducers/index";
// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

// declare global {
//     interface Window {
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
//     }
// }

// const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk)),
// );

root.render((
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
));
