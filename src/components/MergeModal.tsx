import { default as cx } from "classnames";
import StringInputRow from "./form/StringInputRow";
import { fetchData, validateDateString } from "../helpers";

const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = window.PluginApi.components;
const { Modal } = PluginApi.libraries.Bootstrap;
const { faPencil } = window.PluginApi.libraries.FontAwesomeSolid;

const MergeModal: React.FC<MergeModalProps> = (props) => {
  console.log("source performer:", props.sourcePerformer);
  console.log("destination performer:", props.destinationPerformer);

  /* -------------------------------------------- Name -------------------------------------------- */

  const [selectedName, setSelectedName] =
    React.useState<PerformerPosition>("source");

  /* --------------------------------------- Disambiguation --------------------------------------- */

  const [selectedDisambiguation, setSelectedDisambiguation] =
    React.useState<PerformerPosition>(
      props.sourcePerformer.disambiguation ? "source" : "destination"
    );

  const [pDisambiguation, setPDisambiguation] = React.useState<
    Performer["disambiguation"]
  >(props.sourcePerformer.disambiguation);

  /* ------------------------------------------ Birthdate ----------------------------------------- */

  const [selectedBirthdate, setSelectedBirthdate] =
    React.useState<PerformerPosition>(
      props.sourcePerformer.birthdate ? "source" : "destination"
    );

  const [pBirthdate, setPBirthdate] = React.useState<Performer["birthdate"]>(
    props.sourcePerformer.birthdate
  );
  const [validBirthdate, setValidBirthdate] = React.useState(true);

  const validateBirthdate = (val: string) =>
    setValidDeathDate(
      // Ignore validation if destination source is selected
      selectedBirthdate === "destination" || validateDateString(val)
    );

  // Ignore validation for birthdate if changed back to destination performer.
  // useEffect required as the change isn't picked up after validateBirthdate is
  // passed to the component.
  React.useEffect(() => {
    selectedBirthdate === "destination"
      ? setValidBirthdate(true)
      : validateBirthdate(pBirthdate ?? "");
  }, [selectedBirthdate]);

  /* ----------------------------------------- Death date ----------------------------------------- */

  const [selectedDeathDate, setSelectedDeathDate] =
    React.useState<PerformerPosition>(
      props.sourcePerformer.death_date ? "source" : "destination"
    );

  const [pDeathDate, setPDeathDate] = React.useState<Performer["death_date"]>(
    props.sourcePerformer.death_date
  );
  const [validDeathDate, setValidDeathDate] = React.useState(true);

  const validateDeathDate = (val: string) =>
    setValidDeathDate(
      // Ignore validation if destination source is selected
      selectedDeathDate === "destination" || validateDateString(val)
    );

  // Ignore validation for death date if changed back to destination performer.
  // useEffect required as the change isn't picked up after validateDeathDate is
  // passed to the component.
  React.useEffect(() => {
    selectedDeathDate === "destination"
      ? setValidDeathDate(true)
      : validateDeathDate(pDeathDate ?? "");
  }, [selectedDeathDate]);

  /* ------------------------------------------ Ethnicity ----------------------------------------- */

  const [selectedEthnicity, setSelectedEthnicity] =
    React.useState<PerformerPosition>(
      props.sourcePerformer.ethnicity ? "source" : "destination"
    );

  const [pEthnicity, setPEthnicity] = React.useState<Performer["ethnicity"]>(
    props.sourcePerformer.ethnicity
  );

  /* ------------------------------------------- General ------------------------------------------ */

  // Update values on source performer change
  React.useEffect(() => {
    setPDisambiguation(props.sourcePerformer.disambiguation);
    setPBirthdate(props.sourcePerformer.birthdate);
  }, [props.sourcePerformer]);

  // Enable confirm button if all fields with validation pass.
  const canSubmit = validBirthdate && validDeathDate;

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
        selectedDisambiguation === "source" && pDisambiguation
          ? pDisambiguation
          : props.destinationPerformer.disambiguation,
      birthdate:
        selectedBirthdate === "source" && !!pBirthdate
          ? new Date(pBirthdate).toISOString().split("T")[0]
          : props.destinationPerformer.birthdate,
      death_date:
        selectedDeathDate === "source" && !!pDeathDate
          ? new Date(pDeathDate).toISOString().split("T")[0]
          : props.destinationPerformer.death_date,
      ethnicity:
        selectedEthnicity === "source" && pEthnicity
          ? pEthnicity
          : props.destinationPerformer.ethnicity,
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
            <StringInputRow
              destinationValue={props.destinationPerformer.birthdate ?? ""}
              label="Birthdate"
              placeholder="YYYY-MM-DD"
              selectedInput={selectedBirthdate}
              setSelectedInput={setSelectedBirthdate}
              setSourceValue={setPBirthdate}
              sourceValue={pBirthdate ?? ""}
              validation={validateBirthdate}
            />
            <StringInputRow
              destinationValue={props.destinationPerformer.death_date ?? ""}
              label="Death date"
              placeholder="YYYY-MM-DD"
              selectedInput={selectedDeathDate}
              setSelectedInput={setSelectedDeathDate}
              setSourceValue={setPDeathDate}
              sourceValue={pDeathDate ?? ""}
              validation={validateDeathDate}
            />
            <StringInputRow
              destinationValue={props.destinationPerformer.ethnicity ?? ""}
              label="Ethnicity"
              placeholder="Ethnicity"
              selectedInput={selectedEthnicity}
              setSelectedInput={setSelectedEthnicity}
              setSourceValue={setPEthnicity}
              sourceValue={pEthnicity ?? ""}
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
            disabled={!canSubmit}
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
