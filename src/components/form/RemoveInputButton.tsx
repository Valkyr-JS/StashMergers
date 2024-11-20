const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = PluginApi.components;
const { faMinus } = PluginApi.libraries.FontAwesomeSolid;

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
