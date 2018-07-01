import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppRouter } from "./router/router";
import registerServiceWorker from "./registerServiceWorker";
import * as Raven from "raven-js";
import * as createRavenMiddleware from "raven-for-redux";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./assets/css/index.css";
import "font-awesome/css/font-awesome.css";

import { DebtEntity, loadState, saveState } from "./models";

import { applyMiddleware, compose, createStore, Middleware } from "redux";
import { Provider } from "react-redux";
import { reducers } from "./reducers";
import reduxThunk from "redux-thunk";
const throttle = require("lodash/throttle");

function setUpMiddleware(): Middleware[] {
    let middlewareArray = [reduxThunk];

    const sentryDsn = process.env.REACT_APP_PLEX_SENTRY_DSN;

    if (process.env.NODE_ENV !== "production" || !sentryDsn) {
        return middlewareArray;
    }

    Raven.config(sentryDsn).install();

    const ravenMiddleware = createRavenMiddleware(Raven);

    return [...middlewareArray, ravenMiddleware];
}

const devToolsKey: string = "devToolsExtension";

const persistedState = loadState();

const env = process.env.NODE_ENV || "unknown";

const middlewares: Middleware[] = setUpMiddleware();

let store = createStore(
    reducers,
    persistedState,
    compose(
        applyMiddleware(...middlewares),
        window[devToolsKey] ? window[devToolsKey]() : (f: any) => f,
    ),
);

store.subscribe(
    throttle(() => {
        const {
            debtEntities,
            pendingDebtEntityIssuanceHashes,
        } = store.getState().debtEntityReducer;

        const pendingDebtEntities = new Map<string, DebtEntity>();

        for (const issuanceHash of pendingDebtEntityIssuanceHashes) {
            pendingDebtEntities.set(issuanceHash, debtEntities.get(issuanceHash));
        }

        // We only save the DebtEntities that are pending; all other DebtEntities should be retrieved through dharma.js.
        saveState({
            debtEntityReducer: {
                debtEntities: pendingDebtEntities,
                filledDebtEntityIssuanceHashes: [],
                pendingDebtEntityIssuanceHashes,
            },
            plexReducer: store.getState().plexReducer,
        });
    }, 1000),
);

ReactDOM.render(
    <Provider store={store}>
        <AppRouter store={store} env={env} />
    </Provider>,
    document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
