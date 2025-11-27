import React from "react";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const { Icon } = window.PluginApi.components;

const RemoveInputButton: React.FC<RemoveInputButtonProps> = (props) => {
  // Component
  const Button = () => (
    <button type="button" className="btn btn-danger" onClick={props.onClick}>
      <Icon icon={faMinus} />
    </button>
  );

  return props.appended ? (
    <div className="input-group-append">
      <Button />
    </div>
  ) : (
    <Button />
  );
};

export default RemoveInputButton;

interface RemoveInputButtonProps {
  /** If `true`, wraps the button in a class element to style it as linked to an
   * input. */
  appended?: boolean;

  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
