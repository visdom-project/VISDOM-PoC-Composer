import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, Grid, Page, Table } from "tabler-react";
import DashboardWrapper from "../../components/DashboardWrapper";
import ActionButton from "../../components/actionButton";

export default function ViewConfigurations(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  function createTableRow(view) {
    return (
      <Table.Row>
        <Table.Col>{view.name}</Table.Col>
        <Table.Col>{view.description}</Table.Col>
        <Table.Col className="w-1">
          <ButtonGroup aria-label="Actions">
            {
              <ActionButton
                id={view.id}
                onClickFunction={viewItem}
                color="secondary"
                icon="eye"
                tooltip="View configuration in dashboard"
              />
            }
            {
              <ActionButton
                id={view.id}
                onClickFunction={configureItem}
                color="secondary"
                icon="settings"
                tooltip="Configure view"
              />
            }
          </ButtonGroup>
        </Table.Col>
        <Table.Col className="w-1">
          {
            <ActionButton
              id={view.id}
              onClickFunction={deleteItem}
              color="danger"
              icon="trash"
              tooltip="Delete view"
            />
          }
        </Table.Col>
      </Table.Row>
    );
  }

  function viewItem(id) {
    history.push("/composer/" + id);
  }

  function configureItem(id) {
    history.push("/composer/view-configuration/" + id);
  }

  function gotoAddNew() {
    history.push("/composer/add-view-configuration");
  }

  function deleteItem(id) {
    dispatch({
      type: "viewConfiguration/remove",
      payload: { id: id },
    });
  }

  //const views = useSelector(selectViewConfigurations);
  const views = useSelector((state) => state.viewConfiguration.views);
  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title="Views" />
        <Grid.Row>
          <Grid.Col xs={12}>
            <Card>
              <Card.Header>
                <Card.Title>Maintain your views</Card.Title>
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
                  {views.map((view) => createTableRow(view))}
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
