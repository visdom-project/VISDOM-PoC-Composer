import React from "react";
import { Provider } from "react-redux";
import "regenerator-runtime/runtime";
import App from "./components/app";
import Loading from "./components/loading";
import { default as ComposerStore } from "./store";

/**
 * Application root component used as an entrypoint.
 *
 * @component
 * @param {*} props - Component props.
 */
export default function Root(props) {
  // Usually we should use a redux-persist PersistGate. But that doesn't work here.
  if (ComposerStore.getState()._persist.rehydrated !== true) {
    return <Loading />;
  }
  return (
    <Provider store={ComposerStore}>
      <App />
    </Provider>
  );
}
