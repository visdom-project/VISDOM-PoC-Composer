import React from "react";
import Form from "react-bootstrap/Form";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "react-widgets/dist/css/react-widgets.css";
import Multiselect from "react-widgets/lib/Multiselect";
import { Field, reduxForm } from "redux-form";
import { Button, Card, Grid, Page } from "tabler-react";
import DashboardWrapper from "../../components/DashboardWrapper";

let InitializeFromStateForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleSubmit, pristine, reset, submitting } = props;

  const multiselectData = props.applications.map((app) => ({
    name: app.name,
    microfrontendKey: app.microfrontendKey,
  }));

  const renderMultiselect = ({ input, data }) => (
    <Multiselect
      {...input}
      onBlur={() => input.onBlur()}
      data={data}
      valueField="microfrontendKey"
      textField="name"
    />
  );

  function myHandleSubmit(data) {
    dispatch({
      type: "composerApplication/create",
      payload: { item: data },
    });
  }

  const gotoList = () => {
    history.push("/composer/application-configuration");
  };

  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title="Add application" />
        <Grid.Row>
          <Grid.Col xs={12}>
            <Form className="col-12" onSubmit={handleSubmit(myHandleSubmit)}>
              <Card>
                <Card.Header>
                  <Card.Title>Add a new application</Card.Title>
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
                        placeholder="Application name"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group
                      className="w-100"
                      controlId="modifyapplicationConfigurationDescription"
                    >
                      <Form.Label>Package name</Form.Label>
                      <Field
                        id="modifyapplicationConfigurationDescription"
                        className="form-control"
                        name="packageName"
                        component="input"
                        type="text"
                        placeholder="Package name"
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
                      View all
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
  form: "addapplicationConfigurationForm", // a unique identifier for this form
  enableReinitialize: true,
})(InitializeFromStateForm);

InitializeFromStateForm = connect((state) => ({
  applications: state.composerApplication.applications,
}))(InitializeFromStateForm);

export default InitializeFromStateForm;
