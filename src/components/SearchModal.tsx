const { PluginApi } = window;
const { React } = PluginApi;
const { Modal } = PluginApi.libraries.Bootstrap;

const SearchModal: React.FC<SearchModalProps> = (props) => {
  /** Handler for hiding the modal. */
  const handleHideModal = () => {
    props.setShow(false);
    props.clearMergeDirection();
  };

  return (
    <Modal show={props.show} onHide={handleHideModal}>
      <Modal.Header>Modal header</Modal.Header>
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
