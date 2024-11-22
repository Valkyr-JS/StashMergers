import { fetchData, fetchPerformerData } from "../helpers";

const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = PluginApi.components;
const { Modal } = PluginApi.libraries.Bootstrap;
const { faRightToBracket, faRightFromBracket } =
  PluginApi.libraries.FontAwesomeSolid;
const { useIntl } = PluginApi.libraries.Intl;

const SearchModal: React.FC<SearchModalProps> = (props) => {
  // https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/locales/en-GB.json
  const intl = useIntl();

  const heading = intl.formatMessage({
    id:
      props.mergeDirection === "from"
        ? "actions.merge_from"
        : "actions.merge_into",
  });

  /* ------------------------------------- Performer selection ------------------------------------ */

  /**
   * ! There is an issue with the PerformerSelect component which is likely
   * happening in the PluginApi. The component only loads if called on an page
   * other than the first. I.e. it doesn't work on a hard refresh or if the
   * performer profile page is navigated to directly. Bug raised at
   * https://github.com/stashapp/stash/issues/5479
   */

  const [componentsReady, setComponentsReady] = React.useState(false);

  // ? Short-term workaround for the above bug. Use a timeout to wait for the
  // PluginApi to fully load before continuing.
  setTimeout(() => setComponentsReady(true), 100);

  if (!componentsReady) return null;

  const { PerformerSelect } = window.PluginApi.components;

  /** Handler for selecting a performer in the selection list */
  const handleSelect = (performers: Performer[]) => {
    if (performers.length)
      fetchPerformerData(performers[0].id).then((res) =>
        props.setSelectedPerformer(res)
      );
  };

  /* -------------------------------------------- Modal ------------------------------------------- */

  /** Handler for closing the modal. */
  const handleCloseModal = () => {
    props.setShow(false);
    props.setSelectedPerformer(undefined);
  };

  /** Handler for clicking the confirm button. */
  const handleConfirmButtonClick = () => {
    props.setShow(false);
    props.setShowMergeModal(true);
  };

  const modalIcon =
    props.mergeDirection === "from" ? faRightToBracket : faRightFromBracket;

  const searchPerformerType = intl.formatMessage({
    id:
      props.mergeDirection === "from"
        ? "dialogs.merge.source"
        : "dialogs.merge.destination",
  });

  /* ------------------------------------------ Component ----------------------------------------- */

  return (
    <Modal className="merge-performers-search-modal" show={props.show}>
      <Modal.Header>
        <Icon icon={modalIcon} />
        <span>{heading}</span>
      </Modal.Header>
      <Modal.Body>
        <div className="form-container row px-3">
          <div className="col-12 col-lg-6 col-xl-12">
            <div className="form-group row">
              <label
                htmlFor={searchPerformerType.toLowerCase()}
                className="form-label col-form-label col-xl-12 col-sm-3"
              >
                {searchPerformerType}
              </label>
              <div className="col-xl-12 col-sm-9">
                <PerformerSelect
                  active={!!props.selectedPerformer?.id}
                  creatable={false}
                  isClearable={true}
                  onSelect={handleSelect}
                  values={
                    props.selectedPerformer ? [props.selectedPerformer] : []
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ marginLeft: "auto" }}>
          <button
            className="btn btn-secondary"
            onClick={handleCloseModal}
            type="button"
          >
            {intl.formatMessage({ id: "actions.cancel" })}
          </button>
          <button
            className="ml-2 btn btn-primary"
            disabled={!props.selectedPerformer}
            onClick={handleConfirmButtonClick}
            type="button"
          >
            {intl.formatMessage({ id: "actions.confirm" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModal;

interface SearchModalProps {
  /** The type of modal this is. */
  mergeDirection: MergeDirection;

  selectedPerformer: Performer | undefined;

  setSelectedPerformer: React.Dispatch<
    React.SetStateAction<Performer | undefined>
  >;

  /** Set whether to display the modal. */
  setShow: React.Dispatch<React.SetStateAction<boolean>>;

  /** Set whether to display the merge modal. */
  setShowMergeModal: React.Dispatch<React.SetStateAction<boolean>>;

  /** Whether to display the modal. */
  show: boolean;
}
