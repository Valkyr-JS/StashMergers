const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = window.PluginApi.components;
const { Modal } = PluginApi.libraries.Bootstrap;
const { faRightToBracket, faRightFromBracket } =
  window.PluginApi.libraries.FontAwesomeSolid;

const SearchModal: React.FC<SearchModalProps> = (props) => {
  /* ------------------------------------- Performer selection ------------------------------------ */

  /**
   * ! There is an issue with the PerformerSelect component which is likely
   * happening in the PluginApi. The component only loads if called on an page
   * other than the first. I.e. it doesn't work on a hard refresh or if the
   * performer profile page is navigated to directly. Bug raised at
   * https://github.com/stashapp/stash/issues/5479
   */

  const [componentsReady, setComponentsReady] = React.useState(false);

  const [selectedPerformer, setSelectedPerformer] = React.useState<
    Performer | undefined
  >();

  // ? Short-term workaround for the above bug. Use a timeout to wait for the
  // PluginApi to fully load before continuing.
  setTimeout(() => setComponentsReady(true), 100);

  if (!componentsReady) return null;
  console.log("rendering SearchModal");

  const { PerformerSelect } = window.PluginApi.components;
  console.log("PerformerSelect:", PerformerSelect);

  /** Handler for selecting a performer in the selection list */
  const handleSelect = (performers: Performer[]) => {
    if (performers.length) {
      setSelectedPerformer(performers[0]);
      console.log("Selected performer:", performers[0]);
    } else {
      setSelectedPerformer(undefined);
      console.log("Selected performer cleared");
    }
  };

  /* -------------------------------------------- Modal ------------------------------------------- */

  /** Handler for closing the modal. */
  const handleCloseModal = () => {
    props.setShow(false);
    setSelectedPerformer(undefined);
  };

  const modalIcon =
    props.mergeDirection === "from" ? faRightToBracket : faRightFromBracket;

  const searchPerformerType =
    props.mergeDirection === "from" ? "Source" : "Destination";

  /* ------------------------------------------ Component ----------------------------------------- */

  return (
    <Modal className="merge-performers-search-modal" show={props.show}>
      <Modal.Header>
        <Icon icon={modalIcon} />
        <span>Merge {props.mergeDirection}</span>
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
                  active={!!selectedPerformer?.id}
                  creatable={false}
                  isClearable={true}
                  onSelect={handleSelect}
                  values={selectedPerformer ? [selectedPerformer] : []}
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
            Cancel
          </button>
          <button
            className="ml-2 btn btn-primary"
            disabled={!selectedPerformer}
            onClick={handleCloseModal}
            type="button"
          >
            Confirm
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

  /** Whether to display the modal. */
  show: boolean;

  /** Set whether to display the modal. */
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
