import React from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { connect, useDispatch } from "react-redux";
import { matchPath } from "react-router";
import { useHistory } from "react-router-dom";
import "react-widgets/dist/css/react-widgets.css";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Button, Card, Grid, Page } from "tabler-react";
import DashboardWrapper from "../../components/DashboardWrapper";
import constants from "../../constants";
import validate from "./validate";

/**
 * A default configuration for new microfrontend applications. Defaults to the first one.
 *
 * @param {*} applications - A list of application objects.
 * @returns - An object with default attributes for a new microfrontend.
 */
const microfrontendDefaultData = (applications) => {
  let key = null;
  if (
    applications &&
    Array.isArray(applications) &&
    applications.length > 0 &&
    applications[0]
  ) {
    key = applications[0].microfrontendKey;
  }
  return {
    microfrontendKey: key,
    sizes: {
      xs: "12",
      sm: "12",
      md: "12",
      lg: "12",
      xl: "12",
    },
  };
};

/**
 * A list of option tags for microfrontends.
 *
 * @returns A list of option tags for microfrontends.
 */
function createOptions(apps) {
  if (!apps || apps.length < 1) {
    return <option></option>;
  }
  return apps.map((app) => {
    return <option value={app.microfrontendKey}>{app.name}</option>;
  });
}

/**
 * A list of option tags for sizes 1-12.
 *
 * @returns A list of option tags for sizes 1-12.
 */
const sizeOptions = () => {
  let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return a.map((o) => {
    return <option value={o}>{o}</option>;
  });
};

/**
 * A ReactRedux form text element.
 *
 * @param {*} field - ReactRedux field. Comes automatically from <Field>.
 * @returns A textual input element.
 */
const renderTextField = (field) => (
  <div className="input-row">
    <input {...field.input} type="text" class="form-control" />
    {field.meta.touched && field.meta.error && (
      <span className="error">{field.meta.error}</span>
    )}
  </div>
);

/**
 * An element for creating individual microfrontends.
 *
 * @param {*} ReduxForm parameters.
 * @returns A ReduxForm FieldArray component for selecting microfrontends.
 */
const renderMicrofrontends = ({
  applications,
  fields,
  meta: { error, submitFailed },
}) => {
  return (
    <div>
      <Form.Row>
        <Button
          className="mb-3"
          color="primary"
          onClick={() => fields.push(microfrontendDefaultData(applications))}
          icon="plus"
          type="button"
        >
          Add microfrontend
        </Button>
      </Form.Row>
      <Form.Row>
        {submitFailed && error && <span>{error}</span>}
        <ul
          className="w-100"
          style={{ "list-style": "none", "padding-left": "0px" }}
        >
          {fields.map((microfrontend, index) => (
            <li key={index}>
              <Card>
                <Card.Header>
                  <Card.Title>Microfrontend #{index + 1}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Row>
                    <Form.Group
                      className="w-100"
                      controlId="modifyViewConfigurationMicrofrontends"
                    >
                      <Form.Label>Microfrontend</Form.Label>
                      <Form.Text id={`${microfrontend}.mfHelpBlock`} muted>
                        Select a microfrontend to be loaded.
                      </Form.Text>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className="w-100">
                      <Field
                        name={`${microfrontend}.microfrontendKey`}
                        className="form-control"
                        component="select"
                        aria-describedby={`${microfrontend}.mfHelpBlock`}
                      >
                        {createOptions(applications)}
                      </Field>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className="w-100">
                      <Form.Label>Sizing</Form.Label>
                      <Form.Text muted>
                        The underlying sizes use Bootstrap to divide the page
                        into 12 sections. Select 12 for a full-width view, 6 for
                        a half-width, etc.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Columnsize - Extrasmall (col-xs-*)
                      </Form.Label>
                      <Field
                        name={`${microfrontend}.sizes.xs`}
                        className="form-control"
                        component="select"
                      >
                        {sizeOptions()}
                      </Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Columnsize - Small (col-sm-*)</Form.Label>
                      <Field
                        name={`${microfrontend}.sizes.sm`}
                        className="form-control"
                        component="select"
                      >
                        {sizeOptions()}
                      </Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Columnsize - Medium (col-md-*)</Form.Label>
                      <Field
                        name={`${microfrontend}.sizes.md`}
                        className="form-control"
                        component="select"
                      >
                        {sizeOptions()}
                      </Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Columnsize - Large (col-lg-*)</Form.Label>
                      <Field
                        name={`${microfrontend}.sizes.lg`}
                        className="form-control"
                        component="select"
                      >
                        {sizeOptions()}
                      </Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Columnsize - Extralarge (col-xl-*)
                      </Form.Label>
                      <Field
                        name={`${microfrontend}.sizes.xl`}
                        className="form-control"
                        component="select"
                      >
                        {sizeOptions()}
                      </Field>
                    </Form.Group>
                  </Form.Row>
                  <Button
                    color="danger"
                    onClick={() => fields.remove(index)}
                    prefix="fa"
                    icon="trash"
                    type="button"
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </li>
          ))}
          {error && <li className="error">{error}</li>}
        </ul>
      </Form.Row>
    </div>
  );
};

let ViewConfigurationForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleSubmit, pristine, reset, submitting } = props;

  const fetchIdFromProps = (p) => {
    if (p && p.id) {
      return parseInt(p.id);
    }
    return null;
  };

  function myHandleSubmit(data) {
    let existingId = fetchIdFromProps(props.initialValues);
    if (existingId) {
      dispatch({
        type: "viewConfiguration/update",
        payload: { id: existingId, item: data },
      });
    } else {
      dispatch({
        type: "viewConfiguration/create",
        payload: { item: data },
      });
    }
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
        <Grid.Row className="bg-white">
          <Grid.Col xs={12}>
            <Page.Header title="Add view" />
            <Form className="col-12" onSubmit={handleSubmit(myHandleSubmit)}>
              <Form.Row>
                <p>
                  Here you can create a new view for the dashboard. Each view
                  can have a varying number of microfrontends that each each
                  have a name, description, a selection of microfrontends and
                  various layout options.
                </p>
              </Form.Row>
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
                    component={renderTextField}
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
                    component={renderTextField}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  className="w-100"
                  controlId="modifyViewConfigurationLayout"
                >
                  <Form.Label>Layout</Form.Label>
                  <Form.Text id="layoutHelpBlock" muted>
                    A fluid layout utilizes the whole width of the page. A
                    page-width standardizes the width depending on device.
                  </Form.Text>
                  <div>
                    <label>
                      <Field
                        id="modifyViewConfigurationLayout"
                        name="fluid"
                        component="input"
                        type="radio"
                        aria-describedby="layoutHelpBlock"
                        value="true"
                      />{" "}
                      Fluid
                    </label>
                    <label className="ml-1">
                      <Field
                        name="fluid"
                        component="input"
                        type="radio"
                        value="false"
                      />{" "}
                      Page-width
                    </label>
                  </div>
                </Form.Group>
              </Form.Row>
              <FieldArray
                name="microfrontends"
                applications={props.applications}
                component={renderMicrofrontends}
              />
              {props.submitFailed ? (
                <Form.Row>
                  <Alert variant="danger" dismissible>
                    Submitting failed. Please check for any errors in the form.
                  </Alert>
                </Form.Row>
              ) : null}

              {props.submitSucceeded ? (
                <Form.Row>
                  <Alert variant="success" dismissible>
                    View saved!
                  </Alert>
                </Form.Row>
              ) : null}

              <Form.Row className="pb-4">
                <div className="d-flex">
                  <Button
                    color="primary"
                    disabled={pristine || submitting}
                    type="submit"
                    icon="save"
                  >
                    Save
                  </Button>
                  <Button
                    color="danger"
                    className="ml-1"
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
                </div>
              </Form.Row>
            </Form>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </DashboardWrapper>
  );
};

function currentViewDefaults(state) {
  // TODO: We cannot use hooks here, such as useparams. Check if this can be done any other way.
  const match = matchPath(location.pathname, {
    path: constants.baseName + "/composer/view-configuration/:id",
    exact: true,
    strict: false,
  });
  let selected = null;
  if (match !== null) {
    selected = parseInt(match.params.id);
  }
  if (selected === null) {
    return {
      name: undefined,
      description: undefined,
      microfrontends: [],
      fluid: "false",
    };
  }
  return state.viewConfiguration.views.find((view) => view.id === selected);
}

ViewConfigurationForm = reduxForm({
  form: "viewConfigurationForm",
  validate,
  enableReinitialize: true,
})(ViewConfigurationForm);

ViewConfigurationForm = connect((state) => ({
  applications: state.composerApplication.applications,
  initialValues: currentViewDefaults(state),
}))(ViewConfigurationForm);

export default ViewConfigurationForm;
