const { PluginApi } = window;
const { React } = PluginApi;
const { DropdownButton } = PluginApi.libraries.Bootstrap;

const MergeDropdownButton: React.FC<MergeDropdownButtonProps> = (_props) => {
  return (
    <DropdownButton
      bsStyle="secondary"
      id="merge-performer-dropdown-button"
      title="Merge..."
    >
      <DropdownMenuItem onClick={() => console.log("Click merge from...")}>
        Merge from...
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => console.log("Click merge into...")}>
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
  return (
    <a
      href="#"
      className="bg-secondary text-white dropdown-item"
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
