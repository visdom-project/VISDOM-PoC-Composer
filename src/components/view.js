import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Page } from "tabler-react";
import ApplicationTemplate from "../components/ApplicationTemplate";
import ViewWrapper from "./ViewWrapper";

function View(props) {
  // TODO: Use props?
  let { id } = useParams();
  const config = useSelector((state) => state.viewConfiguration.views).find(
    (view) => view.id === parseInt(id)
  );

  return (
    <ViewWrapper fluid={config.fluid}>
      <Page.Header title={config.name} subTitle={config.description} />
      <Grid.Row cards deck>
        {config.microfrontends.map((mf) => (
          <ApplicationTemplate config={mf} />
        ))}
      </Grid.Row>
    </ViewWrapper>
  );
}

export default View;
