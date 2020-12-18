import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "react-widgets/dist/css/react-widgets.css";
import { Button, Card, Grid, Page, Table } from "tabler-react";
import ActionButton from "../../components/actionButton";
import DashboardWrapper from "../../components/DashboardWrapper";

function RoleConfigurations(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  function configureItem(id) {
    history.push("/composer/role-configuration/" + id);
  }

  function gotoAddNew() {
    history.push("/composer/add-role-configuration");
  }

  function deleteItem(id) {
    dispatch({
      type: "roleConfiguration/remove",
      payload: { id: id },
    });
  }

  function createTableRow(role) {
    return (
      <Table.Row>
        <Table.Col>{role.name}</Table.Col>
        <Table.Col>{role.description}</Table.Col>
        <Table.Col className="w-1">
          <ButtonGroup aria-label="Actions">
            {
              <ActionButton
                id={role.id}
                onClickFunction={configureItem}
                color="secondary"
                icon="settings"
                tooltip="Configure role"
                type="button"
              />
            }
          </ButtonGroup>
        </Table.Col>
        <Table.Col className="w-1">
          {
            <ActionButton
              id={role.id}
              onClickFunction={deleteItem}
              color="danger"
              icon="trash"
              type="button"
              tooltip="Delete role"
            />
          }
        </Table.Col>
      </Table.Row>
    );
  }

  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title="Application roles" />
        <Grid.Row>
          <Grid.Col xs={12}>
            <Card>
              <Card.Header>
                <Card.Title>Maintain existing roles</Card.Title>
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
                    <Table.ColHeader>Description</Table.ColHeader>
                    <Table.ColHeader>Actions</Table.ColHeader>
                    <Table.ColHeader></Table.ColHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {props.roles.map((role) => createTableRow(role))}
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

function mapStateToProps(state) {
  return { roles: state.roleConfiguration.roles };
}

export default connect(mapStateToProps)(RoleConfigurations);
