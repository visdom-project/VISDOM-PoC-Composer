import React from "react";
import { connect } from "react-redux";
import { Button, Card, Grid, Page } from "tabler-react";
import ApplicationTemplate from "../components/ApplicationTemplate";
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

  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title="Dashboard" />
        <Grid.Row cards deck>
          {props.config.microfrontends.map((mf) => (
            <ApplicationTemplate config={mf} />
          ))}
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
