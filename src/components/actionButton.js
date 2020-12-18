import React from "react";
import { Button } from "tabler-react";

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

export default ActionButton;
