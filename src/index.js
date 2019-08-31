import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import App from "./pages/App"
import store from './store/configureStore'

function renderError(error, statusCode = 500) {
    console.error(error);
    renderApp(statusCode);
}

function renderApp(statusCode) {
    ReactDOM.render((
        <Provider store={store} >
            <App statusCode={statusCode} />
        </Provider>
    ), document.getElementById('root'));
}

let startedApp = false;

function startReact() {
    startedApp = true;
    window._currentUser_ = getUser();

    if (window._currentUser_ === undefined || (window._env_.accessRole && window._currentUser_.authorities.indexOf(window._env_.accessRole) === -1)) {
        renderError('You are not authorized to access this application', 403);
    } else {
        renderApp();
    }
}

function sso_login() {
    var child = window.open(window._env_.serviceHostName + "/login-event", "_blank", "height=200,width=200");

    var interval = setInterval(function() {
        try {
            child.postMessage({ message: "requestToken" }, "*");
        }
        catch (e) {
            if (child.closed) {
                clearInterval(interval);
            }
        }
    }, 200);
}

window._sso_login = sso_login;

window.addEventListener("message", function(event) {
    if (event.data.message === "deliverToken") {
        localStorage.setItem("authToken", event.data.token);
        event.source.close();

        if (!startedApp) {
            startReact();
        }
    }
});

const getUser = () => {
    const accessToken = localStorage.getItem("authToken");

    if (accessToken) {
        const userJson = accessToken.split(".").splice(1, 1).map(atob).map(JSON.parse)[0].user;

        if (userJson !== undefined && userJson !== null && userJson !== "") {
            return JSON.parse(userJson);
        }
    }

    return undefined;
};

try {
    sso_login();
    //startReact();
}
catch (error) {
    renderError(error, 500);
}