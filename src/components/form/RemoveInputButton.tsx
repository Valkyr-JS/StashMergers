import React from "react";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const { Icon } = window.PluginApi.components;

const RemoveInputButton: React.FC<RemoveInputButtonProps> = (props) => {
  return (
    <div className="input-group-append">
      <button type="button" className="btn btn-danger" onClick={props.onClick}>
        <Icon icon={faMinus} />
      </button>
    </div>
  );
};

export default RemoveInputButton;

interface RemoveInputButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
