const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = window.PluginApi.components;
const { Modal } = PluginApi.libraries.Bootstrap;
const { faRightToBracket, faRightFromBracket } =
  window.PluginApi.libraries.FontAwesomeSolid;

const SearchModal: React.FC<SearchModalProps> = (props) => {
  /** Handler for hiding the modal. */
  const handleHideModal = () => {
    props.setShow(false);
    props.clearMergeDirection();
  };

  const modalIcon =
    props.mergeDirection === "from" ? faRightToBracket : faRightFromBracket;

  return (
    <Modal show={props.show} onHide={handleHideModal}>
      <Modal.Header>
        <Icon icon={modalIcon} />
        <span>Merge {props.mergeDirection}</span>
      </Modal.Header>
      <Modal.Body>Modal body</Modal.Body>
      <Modal.Footer>Modal footer</Modal.Footer>
    </Modal>
  );
};

export default SearchModal;

interface SearchModalProps {
  /** Clear the current merge direction  */
  clearMergeDirection: () => void;

  /** The type of modal this is. */
  mergeDirection: MergeDirection;

  /** Whether to display the modal. */
  show: boolean;

  /** Set whether to display the modal. */
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
