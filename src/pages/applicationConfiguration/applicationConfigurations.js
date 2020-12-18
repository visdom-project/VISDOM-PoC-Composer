import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, Grid, Page, Table } from "tabler-react";
import DashboardWrapper from "../../components/DashboardWrapper";

export default function ApplicationConfigurations(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  function createTableRow(application) {
    return (
      <Table.Row>
        <Table.Col>{application.name}</Table.Col>
        <Table.Col>{application.packageName}</Table.Col>
        <Table.Col>{application.microfrontendKey}</Table.Col>
        <Table.Col className="w-1">
          <ButtonGroup aria-label="Actions">
            {
              <ActionButton
                id={application.id}
                onClickFunction={configureItem}
                color="secondary"
                icon="settings"
                tooltip="Configure application"
              />
            }
          </ButtonGroup>
        </Table.Col>
        <Table.Col className="w-1">
          {
            <ActionButton
              id={application.id}
              onClickFunction={deleteItem}
              color="danger"
              icon="trash"
              tooltip="Delete application"
            />
          }
        </Table.Col>
      </Table.Row>
    );
  }

  function configureItem(id) {
    history.push("/composer/application-configuration/" + id);
  }

  function gotoAddNew() {
    history.push("/composer/add-application-configuration");
  }

  function deleteItem(id) {
    dispatch({
      type: "composerApplication/remove",
      payload: { id: id },
    });
  }

  function ActionButton(props) {
    function handleClick() {
      props.onClickFunction(props.id);
    }
    return (
      <Button
        id={props.id}
        color={props.color}
        onClick={handleClick}
        icon={props.icon}
        title={props.tooltip}
      />
    );
  }

  const applications = useSelector(
    (state) => state.composerApplication.applications
  );
  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title="applications" />
        <Grid.Row>
          <Grid.Col xs={12}>
            <Card>
              <Card.Header>
                <Card.Title>Maintain your applications</Card.Title>
              </Card.Header>

              <Table
                cards={true}
                striped={true}
                responsive={true}
                className="table-vcenter"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader>Name</Table.ColHeader>
                    <Table.ColHeader>Package name</Table.ColHeader>
                    <Table.ColHeader>Microfrontend key</Table.ColHeader>
                    <Table.ColHeader>Actions</Table.ColHeader>
                    <Table.ColHeader></Table.ColHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {applications.map((app) => createTableRow(app))}
                </Table.Body>
              </Table>

              <Card.Footer>
                <div className="d-flex">
                  <Button
                    className="ml-auto"
                    color="primary"
                    onClick={gotoAddNew}
                    icon="plus"
                  >
                    Add new
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </DashboardWrapper>
  );
}
