import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Button, Grid, List, RouterContextProvider, Site } from "tabler-react";
import logo from "../assets/images/visdom_logo.png";
import logoLarge from "../assets/images/visdom_logo_primary.png";
import constants from "../constants";

function DashboardWrapper(props) {
  // TODO: Extract to a helper module.
  function assetURL(url) {
    return constants.assetPath + '/' + url;
  }
  function createURL(url) {
    return constants.baseName + url;
  }

  const staticItems = [];
  let subItems = props.views.map((view) => {
    return {
      value: view.name,
      to: "/composer/" + view.id,
      LinkComponent: withRouter(NavLink),
    };
  });
  subItems.push(...staticItems);
  const navBarItems = [
    {
      value: "Home",
      to: "/composer",
      icon: "home",
      LinkComponent: withRouter(NavLink),
      useExact: true,
    },
    {
      value: "Views",
      icon: "layout",
      subItems: subItems,
    },
    {
      value: "Configure",
      icon: "settings",
      subItems: [
        {
          value: "Views",
          to: "/composer/view-configuration",
          LinkComponent: withRouter(NavLink),
          useExact: true,
        },
        {
          value: "Applications",
          to: "/composer/application-configuration",
          LinkComponent: withRouter(NavLink),
          useExact: true,
        },
        {
          value: "Roles",
          to: "/composer/role-configuration",
          LinkComponent: withRouter(NavLink),
          useExact: true,
        },
      ],
    },
  ];

  const accountDropdownProps = {
    avatarURL: assetURL(logo),
    name: props.user.name,
    description: props.user.role,
    options: [
      { icon: "user", value: "Profile", to: createURL("/composer/profile") },
      {
        icon: "log-out",
        value: "Logout",
        to: createURL("/composer/logout"),
      },
    ],
  };

  // TODO: Fix the image. Possibly have to build this ourselves.
  return (
    <Site.Wrapper
      headerProps={{
        href: createURL("/composer"),
        alt: "VISDOM Composer",
        imageURL: assetURL(logoLarge),
        accountDropdown: accountDropdownProps,
      }}
      navProps={{ itemsObjects: navBarItems }}
      routerContextComponentType={withRouter(RouterContextProvider)}
      footerProps={{
        links: [
          <a
            href="https://iteavisdom.org"
            _target="blank"
            rel="noopener noreferrer"
          >
            VISDOM website
          </a>,
        ],
        note: "A smart dashboard composer. For free!",
        copyright: (
          <React.Fragment>
            Copyright © 2020{" "}
            <a
              href="https://iteavisdom.org"
              _target="blank"
              rel="noopener noreferrer"
            >
              ITEA3 VISDOM
            </a>{" "}
            All rights reserved.
          </React.Fragment>
        ),
        nav: (
          <React.Fragment>
            <Grid.Col auto={true}>
              <List className="list-inline list-inline-dots mb-0">
                <List.Item className="list-inline-item">
                  <a href="https://github.com/hebomstr/VISDOM-PoC-Composer">
                    Documentation
                  </a>
                </List.Item>
                <List.Item className="list-inline-item">
                  <a href="./faq.html">FAQ</a>
                </List.Item>
              </List>
            </Grid.Col>
            <Grid.Col auto={true}>
              <Button
                href="https://github.com/hebomstr/VISDOM-PoC-Composer"
                target="_blank"
                size="sm"
                outline
                color="primary"
                RootComponent="a"
              >
                Source code
              </Button>
            </Grid.Col>
          </React.Fragment>
        ),
      }}
    >
      <div className="mt-3">{props.children}</div>
    </Site.Wrapper>
  );
}

function mapStateToProps(state) {
  const roleConfig = state.roleConfiguration.roles.find(
    (role) => role.id === state.session.role
  );
  return {
    user: {
      name: state.session.name || "Demo User",
      role: roleConfig ? roleConfig.name : "Role",
    },
    views: state.viewConfiguration.views,
  };
}

export default connect(mapStateToProps)(DashboardWrapper);
