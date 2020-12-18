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
      type: "viewConfiguration/create",
      payload: { item: data },
    });
  }

  const goto = () => {
    history.push("/composer/" + id);
  };
  const gotoList = () => {
    history.push("/composer/view-configuration");
  };

  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title="Add view" />
        <Grid.Row>
          <Grid.Col xs={12}>
            <Form className="col-12" onSubmit={handleSubmit(myHandleSubmit)}>
              <Card>
                <Card.Header>
                  <Card.Title>Add a new view</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Row>
                    <Form.Group
                      className="w-100"
                      controlId="modifyViewConfigurationName"
                    >
                      <Form.Label>Name</Form.Label>
                      <Field
                        id="modifyViewConfigurationName"
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
                      controlId="modifyViewConfigurationDescription"
                    >
                      <Form.Label>Description</Form.Label>
                      <Field
                        id="modifyViewConfigurationDescription"
                        className="form-control"
                        name="description"
                        component="input"
                        type="text"
                        placeholder="Configuration description"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group
                      className="w-100"
                      controlId="modifyViewConfigurationMicrofrontends"
                    >
                      <Form.Label>Microfrontends</Form.Label>
                      <Field
                        name="microfrontends"
                        className="form-control"
                        component={renderMultiselect}
                        data={multiselectData}
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
  form: "addViewConfigurationForm", // a unique identifier for this form
  enableReinitialize: true,
})(InitializeFromStateForm);

InitializeFromStateForm = connect((state) => ({
  applications: state.composerApplication.applications,
  views: state.viewConfiguration.views,
}))(InitializeFromStateForm);

export default InitializeFromStateForm;
