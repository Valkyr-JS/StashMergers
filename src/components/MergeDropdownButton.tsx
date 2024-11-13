import { default as cx } from "classnames";

const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = window.PluginApi.components;
const { DropdownButton } = PluginApi.libraries.Bootstrap;
const { faRightToBracket, faRightFromBracket } =
  window.PluginApi.libraries.FontAwesomeSolid;

const MergeDropdownButton: React.FC<MergeDropdownButtonProps> = (_props) => {
  return (
    <DropdownButton id="merge-performer-dropdown-button" title="Merge...">
      <DropdownMenuItem onClick={() => console.log("Click merge from...")}>
        <Icon icon={faRightToBracket} />
        Merge from...
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => console.log("Click merge into...")}>
        <Icon icon={faRightFromBracket} />
        Merge into...
      </DropdownMenuItem>
    </DropdownButton>
  );
};

export default MergeDropdownButton;

interface MergeDropdownButtonProps {}

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
        onClick();
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
  onClick: () => void;
}
