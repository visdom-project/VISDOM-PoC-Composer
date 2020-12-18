import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import ErrorBoundary from "./components/errorBoundary";
import RegisterApplications from "./registerApplications";
import Root from "./root.component";
import "./set-public-path";

// Create our SingleSPA application.
const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return <ErrorBoundary />;
  },
});

/**
 * Bootstrap the application. Run once during initialization.
 * @param {*} props - props for the component.
 */
export function bootstrap(props) {
  console.log("Bootstrapping composer...");
  return Promise.resolve().then(() => {
    RegisterApplications();
    console.log("Composer bootstrapped!");
  });
}
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
