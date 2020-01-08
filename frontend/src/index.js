import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import { UserProvider } from "./UserContext";
import * as serviceWorker from "./serviceWorker";
import "./reset.css";

ReactDOM.render(
    <UserProvider>
        <Router />
    </UserProvider>,
    document.getElementById("root")
);
serviceWorker.unregister();
