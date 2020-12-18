import React from "react";
import Form from "react-bootstrap/Form";
import { connect, useDispatch } from "react-redux";
import { matchPath } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import "react-widgets/dist/css/react-widgets.css";
import DropdownList from "react-widgets/lib/DropdownList";
import { Field, reduxForm } from "redux-form";
import { Button, Card, Grid, Page } from "tabler-react";
import DashboardWrapper from "../../components/DashboardWrapper";
import constants from "../../constants";

let InitializeFromStateForm = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { handleSubmit, pristine, reset, submitting } = props;

 const renderDropdown = ({ input, data }) => (
    <DropdownList
      {...input}
      data={data.views}
      textField="name"
      valueField="id"
      defaultValue={data.defaultView}
    />
  );

  function myHandleSubmit(data) {
    dispatch({
      type: "roleConfiguration/update",
      payload: { id: id, item: data },
    });
  }

  const goto = () => {
    history.push("/composer/" + id);
  };
  const gotoList = () => {
    history.push("/composer/role-configuration");
  };

  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title="Modify role" />
        <Grid.Row>
          <Grid.Col xs={12}>
            <Form className="col-12" onSubmit={handleSubmit(myHandleSubmit)}>
              <Card>
                <Card.Header>
                  <Card.Title>Modify role</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Row>
                    <Form.Group
                      className="w-100"
                      controlId="modifyroleConfigurationName"
                    >
                      <Form.Label>Name</Form.Label>
                      <Field
                        id="modifyroleConfigurationName"
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
                      controlId="modifyroleConfigurationDescription"
                    >
                      <Form.Label>Description</Form.Label>
                      <Field
                        id="modifyroleConfigurationDescription"
                        className="form-control"
                        name="description"
                        component="input"
                        type="text"
                        placeholder="Configuration description"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className="w-100" controlId="modifyRole">
                      <Form.Label>Default view</Form.Label>
                      <Field
                        id="modifyRoleConfigurationDefaultView"
                        name="defaultView"
                        className="form-control"
                        component={renderDropdown}
                        data={{
                          views: props.views,
                          defaultView: props.defaultView,
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
                      icon="eraser"
                    >
                      Undo changes
                    </Button>
                    <Button
                      className="ml-1"
                      color="secondary"
                      onClick={gotoList}
                      icon="eye"
                    >
                      View all roles
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

InitializeFromStateForm = reduxForm({
  form: "modifyRoleConfigurationForm",
  enableReinitialize: true,
})(InitializeFromStateForm);

function currentroleDefaults(state) {
  const match = matchPath(location.pathname, {
    path: constants.baseName + "/composer/role-configuration/:id",
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
  return state.roleConfiguration.roles.find((role) => role.id === selected);
}

InitializeFromStateForm = connect((state) => ({
  views: state.viewConfiguration.views,
  initialValues: currentroleDefaults(state),
}))(InitializeFromStateForm);

export default InitializeFromStateForm;
