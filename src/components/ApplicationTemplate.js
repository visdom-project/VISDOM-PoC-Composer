import React from "react";
import { Card, Dimmer, Grid } from "tabler-react";
import MicrofrontendWrapper from "./MicrofrontendWrapper";

export default function ApplicationTemplate(props) {
  const config = props.config;
  let widths = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  };
  if (config.sizes) {
    widths.xs = parseInt(config.sizes["xs"]) || widths.xs;
    widths.sm = parseInt(config.sizes["sm"]) || widths.sm;
    widths.md = parseInt(config.sizes["md"]) || widths.md;
    widths.lg = parseInt(config.sizes["lg"]) || widths.lg;
    widths.xl = parseInt(config.sizes["xl"]) || widths.xl;
  }

  return (
    <Grid.Col
      xs={widths.xs}
      sm={widths.sm}
      md={widths.md}
      lg={widths.lg}
      xl={widths.xl}
    >
      <Card isFullscreenable isCollapsible title={config.name}>
        <Card.Body>
          <MicrofrontendWrapper microfrontend={config}>
            <div className="p-4 d-flex align-items-center justify-content-center">
              <Dimmer active loader></Dimmer>
            </div>
          </MicrofrontendWrapper>
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}
