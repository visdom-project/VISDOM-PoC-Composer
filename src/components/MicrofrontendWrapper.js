import React from "react";

function MicrofrontendWrapper(props) {
  return (
    <div
      id={
        "single-spa-application:" +
        props.microfrontend.microfrontendKey.toLowerCase()
      }
    >
      {props.children}
    </div>
  );
}

export default MicrofrontendWrapper;
