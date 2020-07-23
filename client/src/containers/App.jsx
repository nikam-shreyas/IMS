import { store } from "../store";
import React, { Fragment } from "react";
import { Provider } from "react-redux";
import decode from "jwt-decode";
import { BrowserRouter as Router } from "react-router-dom";
import { setCurrentUser, addError, setToken } from "../store/actions";
import RouteViews from "./RouteViews";

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>        
        <RouteViews />
      </Fragment>
    </Router>
  </Provider>
);
export default App;
