import { default as cx } from "classnames";
import FormNameRow from "./form/FormNameRow";

const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = window.PluginApi.components;
const { Modal } = PluginApi.libraries.Bootstrap;
const { faPencil } = window.PluginApi.libraries.FontAwesomeSolid;

const MergeModal: React.FC<MergeModalProps> = (props) => {
  console.log("source performer:", props.sourcePerformer);
  console.log("destination performer:", props.destinationPerformer);

  /* -------------------------------------------- Data -------------------------------------------- */

  // Name
  const [pName, setPName] = React.useState(props.sourcePerformer.name);
  const [selectedName, setSelectedName] =
    React.useState<PerformerPosition>("source");

  /* -------------------------------------------- Modal ------------------------------------------- */

  /** Handler for closing the modal. */
  const handleCloseModal = () => props.setShow(false);

  const dialogClasses = cx("modal-dialog", "scrape-dialog", "modal-lg");

  /* ------------------------------------------ Component ----------------------------------------- */

  return (
    <Modal
      className="merge-performers-merge-modal"
      dialogClassName={dialogClasses}
      show={props.show}
    >
      <Modal.Header>
        <Icon icon={faPencil} />
        <span>Merge {props.mergeDirection}</span>
      </Modal.Header>
      <Modal.Body>
        <div className="dialog-container">
          <form>
            <div className="px-3 pt-3 row">
              <div className="col-lg-9 offset-lg-3">
                <div className="row">
                  <label className="form-label col-form-label col-6">
                    Destination
                  </label>
                  <label className="form-label col-form-label col-6">
                    Source
                  </label>
                </div>
              </div>
            </div>
            <FormNameRow
              destinationName={props.destinationPerformer.name}
              selectedInput={selectedName}
              setSelectedInput={setSelectedName}
              setSourceName={setPName}
              sourceName={pName}
            />
          </form>
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

export default MergeModal;

interface MergeModalProps {
  /** Current data for the destination performer */
  destinationPerformer: Performer;

  /** The type of modal this is. */
  mergeDirection: MergeDirection;

  /** Whether to display the modal. */
  show: boolean;

  /** Set whether to display the modal. */
  setShow: React.Dispatch<React.SetStateAction<boolean>>;

  /** Current data for the source performer */
  sourcePerformer: Performer;
}
