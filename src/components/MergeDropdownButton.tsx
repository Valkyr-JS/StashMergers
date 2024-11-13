import { default as cx } from "classnames";

const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = window.PluginApi.components;
const { DropdownButton } = PluginApi.libraries.Bootstrap;
const { faRightToBracket, faRightFromBracket } =
  window.PluginApi.libraries.FontAwesomeSolid;

const MergeDropdownButton: React.FC<MergeDropdownButtonProps> = (props) => {
  return (
    <DropdownButton id="merge-performer-dropdown-button" title="Merge...">
      <DropdownMenuItem onClick={props.mergeFromClickHandler}>
        <Icon icon={faRightToBracket} />
        Merge from...
      </DropdownMenuItem>
      <DropdownMenuItem onClick={props.mergeIntoClickHandler}>
        <Icon icon={faRightFromBracket} />
        Merge into...
      </DropdownMenuItem>
    </DropdownButton>
  );
};

export default MergeDropdownButton;

interface MergeDropdownButtonProps {
  mergeFromClickHandler: React.MouseEventHandler<HTMLAnchorElement>;
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
