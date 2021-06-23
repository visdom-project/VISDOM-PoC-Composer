import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "tabler-react/dist/Tabler.css";
import "../assets/css/tabler-override.css";
import history from "../history";
import EmptyView from "../pages/emptyView";
import AddApplicationConfiguration from "../pages/applicationConfiguration/addApplicationConfiguration";
import ModifyApplicationConfiguration from "../pages/applicationConfiguration/modifyApplicationConfiguration";
import ViewConfigurations from "../pages/viewConfiguration/viewConfigurations";
import ApplicationConfigurations from "../pages/applicationConfiguration/applicationConfigurations";
import RoleConfigurations from "../pages/roles/roleConfigurations";
import AddRoleConfiguration from "../pages/roles/addRoleConfiguration";
import ModifyRoleConfiguration from "../pages/roles/modifyRoleConfiguration";
import ViewConfiguration from "../pages/viewConfiguration/ViewConfiguration";
import Profile from "../pages/profile";
import Login from "../pages/login";
import LogoutPage from "../pages/logout";
import View from "./view";
import constants from "../constants";
import { useSelector } from "react-redux";

/**
 * Composer application entrypoint.
 * @param {*} props - Component props.
 */
export default function App(props) {
  const session = useSelector((state) => state.session);
  if (!session || !session.token) {
    return <Login />;
  }

  return (
    <BrowserRouter basename={constants.baseName} history={history}>
      <Switch>
        <Route
          path="/composer/view-configuration/:id"
          component={ViewConfiguration}
          exact
        />
        <Route
          path="/composer/view-configuration"
          component={ViewConfigurations}
        />
        <Route
          path="/composer/add-view-configuration"
          component={ViewConfiguration}
        />
        <Route
          path="/composer/application-configuration/:id"
          component={ModifyApplicationConfiguration}
          exact
        />
        <Route
          path="/composer/application-configuration"
          component={ApplicationConfigurations}
        />
        <Route
          path="/composer/add-application-configuration"
          component={AddApplicationConfiguration}
        />
        <Route
          path="/composer/role-configuration/:id"
          component={ModifyRoleConfiguration}
          exact
        />
        <Route
          path="/composer/role-configuration"
          component={RoleConfigurations}
        />
        <Route
          path="/composer/add-role-configuration"
          component={AddRoleConfiguration}
        />
        <Route path="/composer/profile" component={Profile} />
        <Route path="/composer/logout" component={LogoutPage} />
        <Route path="/composer/:id" component={View} exact />
        <Route path="/composer" component={EmptyView} />
      </Switch>
    </BrowserRouter>
  );
}
