const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = window.PluginApi.components;
const { Modal } = PluginApi.libraries.Bootstrap;
const { faRightToBracket, faRightFromBracket } =
  window.PluginApi.libraries.FontAwesomeSolid;

const SearchModal: React.FC<SearchModalProps> = (props) => {
  /** Handler for closing the modal. */
  const handleCloseModal = () => props.setShow(false);

  const modalIcon =
    props.mergeDirection === "from" ? faRightToBracket : faRightFromBracket;

  const searchPerformerType =
    props.mergeDirection === "from" ? "Source" : "Destination";

  return (
    <Modal show={props.show} onHide={() => null}>
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
              <div className="col-xl-12 col-sm-9">React select</div>
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
          <button disabled type="button" className="ml-2 btn btn-primary">
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
