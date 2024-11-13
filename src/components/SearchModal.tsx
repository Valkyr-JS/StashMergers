const { PluginApi } = window;
const { React } = PluginApi;
const { Modal } = PluginApi.libraries.Bootstrap;

const SearchModal: React.FC<SearchModalProps> = (props) => {
  /** Handler for hiding the modal. */
  const handleHideModal = () => props.setShow(false);

  return (
    <Modal show={props.show} onHide={handleHideModal}>
      <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Modal body</Modal.Body>
      <Modal.Footer>Modal footer</Modal.Footer>
    </Modal>
  );
};

export default SearchModal;

interface SearchModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
