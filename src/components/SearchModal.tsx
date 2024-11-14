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

  return (
    <Modal show={props.show} onHide={() => null}>
      <Modal.Header>
        <Icon icon={modalIcon} />
        <span>Merge {props.mergeDirection}</span>
      </Modal.Header>
      <Modal.Body>Modal body</Modal.Body>
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
