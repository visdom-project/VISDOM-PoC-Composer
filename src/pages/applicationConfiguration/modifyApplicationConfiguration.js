import React from "react";
import Form from "react-bootstrap/Form";
import { connect, useDispatch } from "react-redux";
import { matchPath } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import "react-widgets/dist/css/react-widgets.css";
import { Field, reduxForm } from "redux-form";
import { Button, Card, Grid, Page } from "tabler-react";
import DashboardWrapper from "../../components/DashboardWrapper";
import constants from "../../constants";

let InitializeFromStateForm = (props) => {
  //props.reset();
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { handleSubmit, pristine, reset, submitting } = props;

  function myHandleSubmit(data) {
    dispatch({
      type: "composerApplication/update",
      payload: { id: id, item: data },
    });
  }

  const gotoList = () => {
    history.push("/composer/application-configuration");
  };

  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title="Modify application" />
        <Grid.Row>
          <Grid.Col xs={12}>
            <Form className="col-12" onSubmit={handleSubmit(myHandleSubmit)}>
              <Card>
                <Card.Header>
                  <Card.Title>Modify application</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Row>
                    <Form.Group
                      className="w-100"
                      controlId="modifyapplicationConfigurationName"
                    >
                      <Form.Label>Name</Form.Label>
                      <Field
                        id="modifyapplicationConfigurationName"
                        className="form-control"
                        name="name"
                        component="input"
                        type="text"
                        placeholder="Configuration name"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group
                      className="w-100"
                      controlId="modifyApplicationConfigurationPackageName"
                    >
                      <Form.Label>Package name</Form.Label>
                      <Field
                        id="modifyApplicationConfigurationPackageName"
                        className="form-control"
                        name="packageName"
                        component="input"
                        type="text"
                        placeholder="Configuration description"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group
                      className="w-100"
                      controlId="modifyApplicationConfigurationMicrofrontendKey"
                    >
                      <Form.Label>Microfrontend key</Form.Label>
                      <Field
                        id="modifyApplicationConfigurationMicrofrontendKey"
                        className="form-control"
                        name="microfrontendKey"
                        component="input"
                        type="text"
                        placeholder="Microfrontend key"
                      />
                    </Form.Group>
                  </Form.Row>
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex">
                    <Button
                      color="secondary"
                      disabled={pristine || submitting}
                      onClick={reset}
                      prefix="fa"
                      icon="eraser"
                      type="button"
                    >
                      Undo changes
                    </Button>
                    <Button
                      className="ml-1"
                      color="secondary"
                      onClick={gotoList}
                      icon="eye"
                      type="button"
                    >
                      View all applications
                    </Button>
                    <Button
                      className="ml-auto"
                      color="primary"
                      disabled={pristine || submitting}
                      type="submit"
                      icon="save"
                    >
                      Save
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Form>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </DashboardWrapper>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: "initializeFromState", // a unique identifier for this form
  enableReinitialize: true,
})(InitializeFromStateForm);

function currentapplicationDefaults(state) {
  const match = matchPath(location.pathname, {
    path: constants.baseName + "/composer/application-configuration/:id",
    exact: true,
    strict: false,
  });
  let selected = null;
  if (match !== null) {
    selected = parseInt(match.params.id);
  }
  if (selected === null) {
    return {};
  }
  return state.composerApplication.applications.find(
    (application) => application.id === selected
  );
}

InitializeFromStateForm = connect((state) => ({
  initialValues: currentapplicationDefaults(state),
}))(InitializeFromStateForm);

export default InitializeFromStateForm;
