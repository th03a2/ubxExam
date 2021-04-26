import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import thunk from "redux-thunk";
import reducers from "./reducers";

const reduxStore = (initialState) => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(createHistory())),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
}

export default reduxStore
