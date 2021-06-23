import React from "react";
import { Page } from "tabler-react";
import DashboardWrapper from "./DashboardWrapper";

/**
 * A wrapper for view layouts.
 *
 * @param {*} props - React props for the component. The props "fluid" and "children" are used.
 * @returns
 */
export default function ViewWrapper(props) {
  return props.fluid && (props.fluid === "true" || props.fluid === true) ? (
    <DashboardWrapper>
      <div className="container-fluid">{props.children}</div>
    </DashboardWrapper>
  ) : (
    <DashboardWrapper>
      <Page.Content>{props.children}</Page.Content>
    </DashboardWrapper>
  );
}
