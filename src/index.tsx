import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./components/app/app";
import { Provider } from "react-redux";
import { store } from "./services/store";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

root.render((
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
));
