const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = PluginApi.components;
const { faRightLong } = PluginApi.libraries.FontAwesomeSolid;
const { useIntl } = PluginApi.libraries.Intl;

const MergeListsButton: React.FC<MergeListsButtonProps> = (props) => {
  // https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/locales/en-GB.json
  const intl = useIntl();

  return (
    <div className="col-12 d-flex mt-2">
      <button
        type="button"
        className="btn btn-secondary mx-auto"
        onClick={props.onClick}
      >
        <Icon icon={faRightLong} className="mr-1" />
        {intl.formatMessage({ id: "actions.merge_into" })}
      </button>
    </div>
  );
};

export default MergeListsButton;

interface MergeListsButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
