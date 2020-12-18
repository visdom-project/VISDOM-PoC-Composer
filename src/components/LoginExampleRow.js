import React from "react";
import Form from "react-bootstrap/Form";
import { Field } from "redux-form";
import { Button } from "tabler-react";

const LoginExampleRow = (props) => {
  return (
    <Form.Row className="w-100">
      <div className="d-flex w-100">
        <Form.Group className="flex-fill pr-1">
          {props.includeLabels ? (
            <Form.Label htmlFor={props.formEmailName}>Email</Form.Label>
          ) : null}
          <Field
            id={props.formEmailName}
            readOnly
            className="form-control"
            name={props.formEmailName}
            component="input"
            type="text"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="flex-fill pr-1">
          {props.includeLabels ? (
            <Form.Label htmlFor={props.formPasswordName}>Password</Form.Label>
          ) : null}
          <Field
            id={props.formPasswordName}
            readOnly
            className="form-control"
            name={props.formPasswordName}
            component="input"
            type="text"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="flex-fill align-self-xs-end">
          {props.includeLabels ? (
            <Form.Label></Form.Label>
          ) : null}
          <Button
            className="btn w-100"
            color="secondary"
            disabled={props.formStatus.submitting}
            type="button"
            onClick={() => props.clickCallback(props.email, props.password)}
          >
            Try me
          </Button>
        </Form.Group>
      </div>
    </Form.Row>
  );
};

export default LoginExampleRow;
