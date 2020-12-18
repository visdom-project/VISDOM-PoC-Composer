import React from "react";
import { NavLink, withRouter } from "react-router-dom";

export default function AppLink(props) {
    return withRouter(NavLink);
};
