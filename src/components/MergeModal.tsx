import { default as cx } from "classnames";
import StringInputRow from "./form/StringInputRow";
import { fetchData } from "../helpers";

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
  const [selectedName, setSelectedName] =
    React.useState<PerformerPosition>("source");

  // Disambiguation
  const [selectedDisambiguation, setSelectedDisambiguation] =
    React.useState<PerformerPosition>("source");
  const [pDisambiguation, setPDisambiguation] = React.useState<
    Performer["disambiguation"]
  >(props.sourcePerformer.disambiguation);

  // Update values on source performer change
  React.useEffect(() => {
    setPDisambiguation(props.sourcePerformer.disambiguation);
  }, [props.sourcePerformer]);

  /* -------------------------------------------- Modal ------------------------------------------- */

  /** Handler for closing the modal. */
  const handleClose = () => props.setShow(false);

  const dialogClasses = cx("modal-dialog", "scrape-dialog", "modal-lg");

  /** Handler for clicking the confirm button. */
  const handleConfirm = () => {
    // Get the updated data
    const updatedData: PerformerUpdateInput = {
      id: props.destinationPerformer.id,
      name:
        selectedName === "source"
          ? props.sourcePerformer.name
          : props.destinationPerformer.name,
      disambiguation:
        selectedDisambiguation === "source"
          ? pDisambiguation
          : props.destinationPerformer.disambiguation,
    };

    // Update the destination performer data
    const query = `mutation UpdateDestinationPerformer ($input: PerformerUpdateInput!) { performerUpdate(input: $input) { id } }`;
    fetchData(query, { input: updatedData }).then((res) => console.log(res));

    // Replace source performer ID with destination performer ID in scenes

    // Replace source performer ID with destination performer ID in images

    // Replace source performer ID with destination performer ID in galleries

    // Delete the source performer from the database

    // If the current performer is the source, navigate to the destination
    // performer page

    // Otherwise, close the modal
    handleClose();
  };

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
            <StringInputRow
              destinationValue={props.destinationPerformer.name}
              label="Name"
              placeholder="Name"
              selectedInput={selectedName}
              setSelectedInput={setSelectedName}
              sourceValue={props.sourcePerformer.name}
            />
            <StringInputRow
              destinationValue={props.destinationPerformer.disambiguation ?? ""}
              label="Disambiguation"
              placeholder="Disambiguation"
              selectedInput={selectedDisambiguation}
              setSelectedInput={setSelectedDisambiguation}
              setSourceValue={setPDisambiguation}
              sourceValue={pDisambiguation ?? ""}
            />
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ marginLeft: "auto" }}>
          <button
            className="btn btn-secondary"
            onClick={handleClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="ml-2 btn btn-primary"
            onClick={handleConfirm}
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
