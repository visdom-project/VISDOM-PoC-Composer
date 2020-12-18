import { matchPath } from "react-router";
import { getAppNames, registerApplication } from "single-spa";
import constants from "./constants";
import Utilities from "./utility/helpers";
/**
 * TODO: Importing the store is an anti-pattern. However, sometimes it can't be avoided.
 * Check out the alternatives from here: https://daveceddia.com/access-redux-store-outside-react/
 * This could be done by saving the initial state to localstorage after async initialization.
 * If someone comes up with a non-hacky way, please fix this.
 */
import ComposerStore from "./store";

/**
 * Register applications present in the Redux store.
 * @see module:features/composerApplication/composerApplicationSlice
 */
export default function RegisterApplications() {
  /**
   * Determine whether the microfrontend is a part of the user's default dashboard.
   *
   * @param {*} microfrontendKey - The microfrontend's DOM key.
   * @return {*} - Boolean whether the microfrontend is a part of the user's default dashboard.
   */
  function isPartOfDefaultDashboardView(microfrontendKey) {
    const match = matchPath(location.pathname, {
      path: constants.baseName + "/composer",
      exact: true,
      strict: false,
    });

    if (match === null) {
      return false;
    }
    const state = ComposerStore.getState();
    const view = Utilities.roleDefaultView(
      state.session.role,
      state.roleConfiguration.roles,
      state.viewConfiguration.views
    );

    if (
      view &&
      view.microfrontends
        .map((mf) => mf.microfrontendKey)
        .includes(microfrontendKey)
    ) {
      return true;
    }

    return false;
  }

  function isSpecificView(microfrontendKey) {
    // Check that the URL is under composer config.
    const match = matchPath(location.pathname, {
      path: constants.baseName + "/composer/:id",
      exact: true,
      strict: false,
    });

    if (match === null) {
      return false;
    }

    const view = ComposerStore.getState().viewConfiguration.views.find(
      (view) => view.id === parseInt(match.params.id)
    );

    if (
      view &&
      view.microfrontends
        .map((mf) => mf.microfrontendKey)
        .includes(microfrontendKey)
    ) {
      return true;
    }

    return false;
  }

  /**
   * Determine whether the microfrontend should be active.
   * @param {string} microfrontendKey - DOM identifier for the microfrontend.
   * @return {boolean} Whether the microfrontend should be active on the current URL.
   */
  function showWhenActivated(location, microfrontendKey) {
    if (microfrontendKey === undefined || microfrontendKey === "") {
      throw new Error("Microfrontend key is undefined or empty.");
    }

    if (isPartOfDefaultDashboardView(microfrontendKey)) {
      return true;
    }

    if (isSpecificView(microfrontendKey)) {
      return true;
    }

    return false;
  }

  const registeredApplications = getAppNames();

  // Register applications present in the store.
  const apps = ComposerStore.getState().composerApplication.applications;
  apps.forEach((app) => {
    const lowerCaseName = app.microfrontendKey.toLowerCase();
    if (!registeredApplications.includes(lowerCaseName)) {
      try {
        registerApplication({
          name: lowerCaseName,
          app: () => System.import(app.packageName),
          activeWhen: (location) => showWhenActivated(location, lowerCaseName),
        });
      } catch (error) {
        console.log("App register error: ", error);
      }
    }
  });
}
