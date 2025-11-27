import React from "react";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const { Icon } = window.PluginApi.components;

const RemoveInputButton: React.FC<RemoveInputButtonProps> = (props) => {
  // Component
  const Button = () => (
    <button type="button" {...props} className="btn btn-danger">
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

interface RemoveInputButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /** If `true`, wraps the button in a class element to style it as linked to an
   * input. */
  appended?: boolean;
}
