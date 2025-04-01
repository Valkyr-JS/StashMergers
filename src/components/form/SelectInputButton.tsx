import { default as cx } from "classnames";
import React from "react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const { Icon } = window.PluginApi.components;

const SelectInputButton: React.FC<SelectInputButtonProps> = (props) => {
  /** Button click handler */
  const handleButtonClick = () => props.setSelected(props.performerPosition);

  const iconClasses = cx("fa-fw", {
    "text-success": props.selected,
    "text-muted": !props.selected,
  });

  const iconType = props.selected ? faCheck : faXmark;

  return (
    <div className="input-group-prepend">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleButtonClick}
      >
        <Icon icon={iconType} className={iconClasses} />
      </button>
    </div>
  );
};

export default SelectInputButton;

interface SelectInputButtonProps {
  /** Denotes if the field has been marked as the  */
  selected: boolean;

  performerPosition: PerformerPosition;

  setSelected: React.Dispatch<React.SetStateAction<PerformerPosition>>;
}
