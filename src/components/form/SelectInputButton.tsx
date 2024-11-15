const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = window.PluginApi.components;
const { faCheck, faXmark } = window.PluginApi.libraries.FontAwesomeSolid;

const SelectInputButton: React.FC<SelectInputButtonProps> = (props) => {
  /** Button click handler */
  const handleButtonClick = () => props.setSelected(props.performerPosition);

  const iconClasses = props.selected ? "text-success" : "text-muted";
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
