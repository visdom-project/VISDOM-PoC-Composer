import React from "react";
import Form from "react-bootstrap/Form";
import { connect, useDispatch } from "react-redux";
import "react-widgets/dist/css/react-widgets.css";
import DropdownList from "react-widgets/lib/DropdownList";
import { Field, reduxForm } from "redux-form";
import { Button, Card, Grid, Page } from "tabler-react";
import DashboardWrapper from "../components/DashboardWrapper";
import { useHistory } from "react-router-dom";

let InitializeFromStateForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleSubmit, pristine, reset, submitting } = props;

  function myHandleSubmit(data) {
    dispatch({
      type: "viewConfiguration/updateDefaultView",
      payload: { item: data },
    });
  }

  const goto = () => {
    history.push("/composer");
  };

  const renderDropdown = ({ input, data }) => (
    <DropdownList
      {...input}
      data={data.views}
      textField="name"
      valueField="id"
      defaultValue={data.defaultView}
    />
  );

  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title="Your profile" />
        <Grid.Row>
          <Grid.Col xs={12}>
            <Form className="col-12" onSubmit={handleSubmit(myHandleSubmit)}>
              <Card>
                <Card.Header>
                  <Card.Title>Default dashboard</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Row>
                    <Form.Group className="w-100" controlId="modifyRole">
                      <Form.Label>Default dashboard view</Form.Label>
                      <Field
                        id="modifyRole"
                        name="defaultView"
                        className="form-control"
                        component={renderDropdown}
                        data={{
                          views: props.initialValues.views,
                          defaultView: props.initialValues.defaultView,
                        }}
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
                      type="button"
                      icon="eraser"
                    >
                      Undo changes
                    </Button>
                    <Button
                      className="ml-1"
                      color="secondary"
                      onClick={goto}
                      icon="eye"
                      type="button"
                    >
                      View dashboard
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
  form: "profileForm", // a unique identifier for this form
  enableReinitialize: true,
})(InitializeFromStateForm);

function profileDefaults(state) {
  return {
    defaultView: state.viewConfiguration.defaultView,
    views: state.viewConfiguration.views,
  };
}

InitializeFromStateForm = connect((state) => ({
  initialValues: profileDefaults(state),
}))(InitializeFromStateForm);

export default InitializeFromStateForm;
