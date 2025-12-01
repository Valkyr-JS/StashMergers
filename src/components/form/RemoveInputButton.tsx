import React from "react";
import { default as cx } from "classnames";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const { Icon } = window.PluginApi.components;

const RemoveInputButton: React.FC<RemoveInputButtonProps> = (props) => {
  const classes = cx("btn", {
    "btn-danger": !props.toggleState,
    "btn-success": props.toggleState,
  });

  // Component
  const Button = () => (
    <button type="button" {...props} className={classes}>
      <Icon icon={props.toggleState ? faPlus : faMinus} />
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

  /** Sets the toggle state of the button re-add. */
  toggleState?: boolean;
}
