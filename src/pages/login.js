import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import "react-widgets/dist/css/react-widgets.css";
import { change, Field, reduxForm } from "redux-form";
import InlineSVG from "svg-inline-react";
import { Button, Card, Grid, Page } from "tabler-react";
import LoginBackground from "../assets/images/background_login.svg";
import LoginExampleRow from "../components/LoginExampleRow";

let LoginFormImplementation = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit, pristine, reset, submitting } = props;

  const [showAlert, setShow] = useState(false);

  const temporaryUsers = [
    {
      name: "John Smith",
      role: 1,
      email: "admin@test.com",
      password: "adminpassword",
    },
    {
      name: "Jane Smith",
      role: 2,
      email: "teacher@test.com",
      password: "teacherpassword",
    },
    {
      name: "Alexie Bate",
      role: 3,
      email: "assistant@test.com",
      password: "assistantpassword",
    },
    {
      name: "Pearl Blundell",
      role: 4,
      email: "student@test.com",
      password: "studentpassword",
    },
  ];

  useEffect(() => {
    props.dispatch(
      change("loginForm", "loginEmailAddressAdmin", "admin@test.com")
    );
    props.dispatch(change("loginForm", "loginPasswordAdmin", "adminpassword"));
    props.dispatch(
      change("loginForm", "loginEmailAddressTeacher", "teacher@test.com")
    );
    props.dispatch(
      change("loginForm", "loginPasswordTeacher", "teacherpassword")
    );
    props.dispatch(
      change("loginForm", "loginEmailAddressAssistant", "assistant@test.com")
    );
    props.dispatch(
      change("loginForm", "loginPasswordAssistant", "assistantpassword")
    );
    props.dispatch(
      change("loginForm", "loginEmailAddressStudent", "student@test.com")
    );
    props.dispatch(
      change("loginForm", "loginPasswordStudent", "studentpassword")
    );
  });

  function formHandleSubmit(data) {
    let user = temporaryUsers.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (user) {
      dispatch({
        type: "session/login",
        payload: {
          token: "temporarytoken",
          name: user.name,
          role: user.role,
        },
      });
    } else {
      setShow(true);
    }
  }

  function setFormValues(email, password) {
    props.dispatch(change("loginForm", "email", email));
    props.dispatch(change("loginForm", "password", password));
  }

  function alertDialog() {
    if (!showAlert) {
      return null;
    }

    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Something went wrong</Alert.Heading>
        <p>
          Unfortunately, we were not able to log you in. Please check that you
          provided correct credentials.
        </p>
      </Alert>
    );
  }

  return (
    <Page className="page-single">
      <Grid.Row className="w-100 align-items-center">
        <Grid.Col sm={5} offsetSm={1} className="d-none d-sm-block">
          <img src={LoginBackground} />
        </Grid.Col>
        <Grid.Col xs={12} sm={5}>
          <Form className="w-100" onSubmit={handleSubmit(formHandleSubmit)}>
            <Card>
              <Card.Body className="p-5">
                <h1 className="text-center pt-5 pb-5 text-blue">Welcome</h1>
                <LoginExampleRow
                  email="admin@test.com"
                  password="adminpassword"
                  formEmailName="loginEmailAddressAdmin"
                  formPasswordName="loginPasswordAdmin"
                  clickCallback={setFormValues}
                  formStatus={{ submitting: submitting, pristine: pristine }}
                  includeLabels
                />
                <LoginExampleRow
                  email="teacher@test.com"
                  password="teacherpassword"
                  formEmailName="loginEmailAddressTeacher"
                  formPasswordName="loginPasswordTeacher"
                  clickCallback={setFormValues}
                  formStatus={{ submitting: submitting, pristine: pristine }}
                />
                <LoginExampleRow
                  email="assistant@test.com"
                  password="assistantpassword"
                  formEmailName="loginEmailAddressAssistant"
                  formPasswordName="loginPasswordAssistant"
                  clickCallback={setFormValues}
                  formStatus={{ submitting: submitting, pristine: pristine }}
                />
                <LoginExampleRow
                  email="student@test.com"
                  password="studentpassword"
                  formEmailName="loginEmailAddressStudent"
                  formPasswordName="loginPasswordStudent"
                  clickCallback={setFormValues}
                  formStatus={{ submitting: submitting, pristine: pristine }}
                />
                <Form.Row className="pt-5">
                  <Form.Group className="w-100" controlId="loginEmailAddress">
                    <Form.Label>Email address</Form.Label>
                    <Field
                      id="loginEmailAddress"
                      className="form-control"
                      name="email"
                      component="input"
                      type="text"
                      placeholder="Enter email"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group className="w-100" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Field
                      id="loginPassword"
                      className="form-control"
                      name="password"
                      component="input"
                      type="password"
                      placeholder="Enter password"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row className="pt-5">
                  <Form.Group className="w-100" controlId="loginButton">
                    <Button
                      className="btn btn-primary btn-lg call-to-action pl-5 pr-5 w-100"
                      color="primary"
                      disabled={pristine || submitting}
                      type="submit"
                    >
                      Sign in
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Card.Body>
            </Card>
          </Form>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>{alertDialog()}</Grid.Row>
    </Page>
  );
};

let LoginForm = reduxForm({
  form: "loginForm",
})(LoginFormImplementation);

export default LoginForm;
