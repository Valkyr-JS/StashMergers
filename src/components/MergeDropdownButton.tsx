import { default as cx } from "classnames";
import type { IntlShape } from "react-intl";
import React from "react";
import { DropdownButton } from "react-bootstrap";
import {
  faRightToBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const { PluginApi } = window;
const { Icon } = PluginApi.components;

const MergeDropdownButton: React.FC<MergeDropdownButtonProps> = ({
  intl,
  ...props
}) => {
  const merge = intl.formatMessage({ id: "actions.merge" });
  return (
    <DropdownButton
      id="merge-performer-dropdown-button"
      title={merge + "..."}
      variant="secondary"
    >
      <DropdownMenuItem onClick={props.mergeFromClickHandler}>
        <Icon icon={faRightToBracket} />
        {intl.formatMessage({ id: "actions.merge_from" })}...
      </DropdownMenuItem>
      <DropdownMenuItem onClick={props.mergeIntoClickHandler}>
        <Icon icon={faRightFromBracket} />
        {intl.formatMessage({ id: "actions.merge_into" })}...
      </DropdownMenuItem>
    </DropdownButton>
  );
};

export default MergeDropdownButton;

interface MergeDropdownButtonProps {
  /** Component can't access intl for some reason, so it needs to be passed.
   * */
  intl: IntlShape;

  /** The click handler for the "Merge from..." button. */
  mergeFromClickHandler: React.MouseEventHandler<HTMLAnchorElement>;

  /** The click handler for the "Merge into..." button. */
  mergeIntoClickHandler: React.MouseEventHandler<HTMLAnchorElement>;
}

/* ---------------------------------------------------------------------------------------------- */
/*                                  Dropdown menu item component                                  */
/* ---------------------------------------------------------------------------------------------- */

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  onClick,
  ...props
}) => {
  const classes = cx("bg-secondary", "text-white", "dropdown-item");
  return (
    <a
      href="#"
      className={classes}
      role="button"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      {...props}
    />
  );
};

interface DropdownMenuItemProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  /** The required click event for the menu item. */
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}
