import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Dimmer, Grid, Page } from "tabler-react";
import DashboardWrapper from "./DashboardWrapper";
import MicrofrontendWrapper from "./MicrofrontendWrapper";

function View(props) {
  let { id } = useParams();
  const config = useSelector((state) => state.viewConfiguration.views).find(
    (view) => view.id === parseInt(id)
  );

  /**
   * Create a template for a single microfrontend.
   * TODO: Figure out layout options.
   * @param {string} microfrontendKey - DOM identifier for the SPA application.
   * @return
   */
  const applicationTemplate = function (microfrontend, widths) {
    return (
      <Grid.Col xs={widths.xs} sm={widths.sm} md={widths.md} lg={widths.lg}>
        <Card isFullscreenable isCollapsible title={microfrontend.name}>
          <Card.Body>
            <MicrofrontendWrapper microfrontend={microfrontend}>
              <div className="p-4 d-flex align-items-center justify-content-center">
                <Dimmer active loader></Dimmer>
              </div>
            </MicrofrontendWrapper>
          </Card.Body>
        </Card>
      </Grid.Col>
    );
  };

  const widths = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
  };
  if (config.microfrontends.length > 1) {
    widths.md = 6;
    widths.lg = 6;
  }

  return (
    <DashboardWrapper>
      <Page.Content>
        <Page.Header title={config.name} subTitle={config.description} />
        <Grid.Row cards deck>
          {config.microfrontends.map((mf) => applicationTemplate(mf, widths))}
        </Grid.Row>
      </Page.Content>
    </DashboardWrapper>
  );
}

export default View;
