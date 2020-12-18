import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "react-widgets/dist/css/react-widgets.css";
import { Card, Grid, Page } from "tabler-react";

function LogoutPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  function performLogout() {
    return new Promise((resolve, reject) => {
      dispatch({
        type: "session/logout",
        payload: {},
      });

      resolve();
    });
  }

  useEffect(() => {
    performLogout().then(() => {
      history.push("/composer");
    });
  });

  if (!props.session.token) {
    return <Redirect to="/composer" />;
  }

  return (
    <Page className="page-single">
      <Grid.Row>
        <Grid.Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Logout</Card.Title>
            </Card.Header>
            <Card.Body className="p-6">
              Logging you out. Please wait...
            </Card.Body>
          </Card>
        </Grid.Col>
      </Grid.Row>
    </Page>
  );
}

function mapStateToProps(state) {
  return { session: state.session };
}

export default connect(mapStateToProps)(LogoutPage);
