import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import UserInterface from "./routes/UserInterface";
import PrivateRoute from "@Components/common/PrivateRoute";
import { storeConfig } from "@Services/StoreService";
import Login from "./routes/Login";
import { history } from "./http";

const store = storeConfig();

export default function App() {
  if (location.hostname !== "localhost") window.console.log = () => {};
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path={"/login"}>
            <Login />
          </Route>
          <PrivateRoute path="/">
            <UserInterface />
          </PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  );
}
