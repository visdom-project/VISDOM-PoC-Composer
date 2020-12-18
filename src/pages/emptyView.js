import React from "react";
import { connect } from "react-redux";
import { Button, Card, Dimmer, Grid, Page } from "tabler-react";
import DashboardWrapper from "../components/DashboardWrapper";
import Utility from "../utility/helpers";

function EmptyView(props) {
  const gotoList = () => {
    props.history.push("/composer/view-configuration");
  };

  function emptyView() {
    return (
      <DashboardWrapper>
        <Page.Content>
          <Page.Header title="Dashboard" />
          <Grid.Row>
            <Grid.Col xs={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Your default dashboard</Card.Title>
                </Card.Header>
                <Card.Body>
                  <p>
                    The default role-specific dashboard will be rendered here in
                    the future.
                  </p>
                </Card.Body>
                <Card.Footer>
                  <Button
                    color="primary"
                    onClick={gotoList}
                    icon="eye"
                    type="button"
                  >
                    Check out other views in the meanwhile
                  </Button>
                </Card.Footer>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Page.Content>
      </DashboardWrapper>
    );
  }

  if (!props.token || !props.config) {
    return emptyView();
  }

  /**
   * Create a template for a single microfrontend.
   * TODO: Figure out layout options.
   * @param {string} microfrontendKey - DOM identifier for the SPA application.
   * @return
   */
  const applicationTemplate = function (microfrontend, widths) {
    return (
      <Grid.Col xs={widths.xs} sm={widths.sm} md={widths.md} lg={widths.lg}>
        <Card isFullscreenable isCollapsible title={microfrontend.name}>
          <Card.Body>
            <div
              id={
                "single-spa-application:" +
                microfrontend.microfrontendKey.toLowerCase()
              }
            >
              <div className="p-4 d-flex align-items-center justify-content-center">
                <Dimmer active loader></Dimmer>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Grid.Col>
    );
  };

  const widths = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
  };
  if (props.config.microfrontends.length > 1) {
    widths.md = 6;
    widths.lg = 6;
  }

  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title="Dashboard" />
        <Grid.Row cards deck>
          {props.config.microfrontends.map((mf) =>
            applicationTemplate(mf, widths)
          )}
        </Grid.Row>
      </Page.Content>
    </DashboardWrapper>
  );
}

function mapStateToProps(state) {
  return {
    token: state.session.token,
    config: Utility.roleDefaultView(
      state.session.role,
      state.roleConfiguration.roles,
      state.viewConfiguration.views
    ),
  };
}

export default connect(mapStateToProps)(EmptyView);
