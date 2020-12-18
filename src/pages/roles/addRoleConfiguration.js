import React from "react";
import Form from "react-bootstrap/Form";
import { connect, useDispatch } from "react-redux";
import "react-widgets/dist/css/react-widgets.css";
import DropdownList from "react-widgets/lib/DropdownList";
import { Field, reduxForm } from "redux-form";
import { Button, Card, Grid, Page, Table } from "tabler-react";
import DashboardWrapper from "../../components/DashboardWrapper";
import { useHistory } from "react-router-dom";
import { ButtonGroup } from "react-bootstrap";
import ActionButton from "../../components/actionButton";

let InitializeFromStateForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleSubmit, pristine, reset, submitting } = props;

  function handleNewRoleSubmit(data) {
    dispatch({
      type: "roleConfiguration/create",
      payload: {
        item: {
          name: data.name,
          description: data.description,
        },
      },
    });
  }

  const gotoList = () => {
    history.push("/composer/role-configuration");
  };

  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title="Your profile" />
        <Grid.Row>
          <Grid.Col xs={12}>
            <Form
              className="col-12"
              onSubmit={handleSubmit(handleNewRoleSubmit)}
            >
              <Card>
                <Card.Header>
                  <Card.Title>Add a new role</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Row>
                    <Form.Group
                      className="w-100"
                      controlId="modifyRoleConfigurationName"
                    >
                      <Form.Label>Name</Form.Label>
                      <Field
                        id="modifyRoleConfigurationName"
                        className="form-control"
                        name="name"
                        component="input"
                        type="text"
                        placeholder="Role name"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group
                      className="w-100"
                      controlId="modifyRoleConfigurationDescription"
                    >
                      <Form.Label>Description</Form.Label>
                      <Field
                        id="modifyRoleConfigurationDescription"
                        className="form-control"
                        name="description"
                        component="input"
                        type="text"
                        placeholder="Role description"
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
                      Create
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

InitializeFromStateForm = reduxForm({
  form: "addRoleForm",
  enableReinitialize: true,
})(InitializeFromStateForm);

InitializeFromStateForm = connect((state) => ({
  initialValues: state.roleConfiguration,
}))(InitializeFromStateForm);

export default InitializeFromStateForm;
