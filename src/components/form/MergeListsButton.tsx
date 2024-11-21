const { PluginApi } = window;
const { React } = PluginApi;
const { useIntl } = PluginApi.libraries.Intl;

const MergeListsButton: React.FC<MergeListsButtonProps> = (props) => {
  // https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/locales/en-GB.json
  const intl = useIntl();

  return (
    <button type="button" className="btn btn-secondary" onClick={props.onClick}>
      {intl.formatMessage({ id: "actions.merge" })}
    </button>
  );
};

export default MergeListsButton;

interface MergeListsButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
