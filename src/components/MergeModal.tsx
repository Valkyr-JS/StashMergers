import { default as cx } from "classnames";
import StringInputRow from "./form/StringInputRow";
import { fetchData, validateDateString } from "../helpers";

const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = PluginApi.components;
const { Modal } = PluginApi.libraries.Bootstrap;
const { faPencil } = PluginApi.libraries.FontAwesomeSolid;
const { useIntl } = PluginApi.libraries.Intl;

const MergeModal: React.FC<MergeModalProps> = ({
  destinationPerformer,
  sourcePerformer,
  ...props
}) => {
  console.log("source performer:", sourcePerformer);
  console.log("destination performer:", destinationPerformer);

  // https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/locales/en-GB.json
  const intl = useIntl();

  const heading = intl.formatMessage({
    id:
      props.mergeDirection === "from"
        ? "actions.merge_from"
        : "actions.merge_into",
  });

  // Only launch the modal if there is valid performer data for both sides.
  if (!sourcePerformer || !destinationPerformer) return null;

  const { birthdate, death_date, disambiguation, ethnicity, hair_color } =
    sourcePerformer;

  /* -------------------------------------------- Name -------------------------------------------- */

  const [selectedName, setSelectedName] =
    React.useState<PerformerPosition>("source");

  /* --------------------------------------- Disambiguation --------------------------------------- */

  const [selectedDisambiguation, setSelectedDisambiguation] =
    React.useState<PerformerPosition>(
      disambiguation ? "source" : "destination"
    );

  const [pDisambiguation, setPDisambiguation] =
    React.useState<Performer["disambiguation"]>(disambiguation);

  /* ------------------------------------------ Birthdate ----------------------------------------- */

  const [selectedBirthdate, setSelectedBirthdate] =
    React.useState<PerformerPosition>(birthdate ? "source" : "destination");

  const [pBirthdate, setPBirthdate] =
    React.useState<Performer["birthdate"]>(birthdate);

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
    React.useState<PerformerPosition>(death_date ? "source" : "destination");

  const [pDeathDate, setPDeathDate] =
    React.useState<Performer["death_date"]>(death_date);

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
    React.useState<PerformerPosition>(ethnicity ? "source" : "destination");

  const [pEthnicity, setPEthnicity] =
    React.useState<Performer["ethnicity"]>(ethnicity);

  /* ----------------------------------------- Hair color ----------------------------------------- */

  const [selectedHairColor, setSelectedHairColor] =
    React.useState<PerformerPosition>(hair_color ? "source" : "destination");

  const [pHairColor, setPHairColor] =
    React.useState<Performer["hair_color"]>(hair_color);

  /* ------------------------------------------- General ------------------------------------------ */

  // Updates on source performer change
  React.useEffect(() => {
    // Update source values
    setPDisambiguation(disambiguation);
    setPBirthdate(birthdate);
    setPDeathDate(death_date);
    setPEthnicity(ethnicity);
    setPHairColor(hair_color);

    /** Update selected position */
    setSelectedName("source");
    setSelectedDisambiguation(disambiguation ? "source" : "destination");
    setSelectedBirthdate(birthdate ? "source" : "destination");
    setSelectedDeathDate(death_date ? "source" : "destination");
    setSelectedEthnicity(ethnicity ? "source" : "destination");
    setSelectedHairColor(hair_color ? "source" : "destination");
  }, [sourcePerformer]);

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
      id: destinationPerformer.id,
      name:
        selectedName === "source"
          ? sourcePerformer.name
          : destinationPerformer.name,
      birthdate:
        selectedBirthdate === "source" && !!pBirthdate
          ? new Date(pBirthdate).toISOString().split("T")[0]
          : destinationPerformer.birthdate,
      death_date:
        selectedDeathDate === "source" && !!pDeathDate
          ? new Date(pDeathDate).toISOString().split("T")[0]
          : destinationPerformer.death_date,
      disambiguation:
        selectedDisambiguation === "source" && pDisambiguation
          ? pDisambiguation
          : destinationPerformer.disambiguation,
      ethnicity:
        selectedEthnicity === "source" && pEthnicity
          ? pEthnicity
          : destinationPerformer.ethnicity,
      hair_color:
        selectedHairColor === "source" && pHairColor
          ? pHairColor
          : destinationPerformer.hair_color,
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
        <span>{heading}</span>
      </Modal.Header>
      <Modal.Body>
        <div className="dialog-container">
          <form>
            <div className="px-3 pt-3 row">
              <div className="col-lg-9 offset-lg-3">
                <div className="row">
                  <label className="form-label col-form-label col-6">
                    {intl.formatMessage({ id: "dialogs.merge.destination" })}
                  </label>
                  <label className="form-label col-form-label col-6">
                    {intl.formatMessage({ id: "dialogs.merge.source" })}
                  </label>
                </div>
              </div>
            </div>
            <StringInputRow
              destinationValue={destinationPerformer.name}
              label={intl.formatMessage({ id: "name" })}
              placeholder={intl.formatMessage({ id: "name" })}
              selectedInput={selectedName}
              setSelectedInput={setSelectedName}
              sourceValue={sourcePerformer.name}
            />
            <StringInputRow
              destinationValue={destinationPerformer.disambiguation ?? ""}
              label={intl.formatMessage({ id: "disambiguation" })}
              placeholder={intl.formatMessage({ id: "disambiguation" })}
              render={disambiguation !== destinationPerformer.disambiguation}
              selectedInput={selectedDisambiguation}
              setSelectedInput={setSelectedDisambiguation}
              setSourceValue={setPDisambiguation}
              sourceValue={pDisambiguation ?? ""}
            />
            <StringInputRow
              destinationValue={destinationPerformer.birthdate ?? ""}
              label={intl.formatMessage({ id: "birthdate" })}
              placeholder={intl.formatMessage({ id: "date_format" })}
              render={
                !!birthdate && birthdate !== destinationPerformer.birthdate
              }
              selectedInput={selectedBirthdate}
              setSelectedInput={setSelectedBirthdate}
              setSourceValue={setPBirthdate}
              sourceValue={pBirthdate ?? ""}
              validation={validateBirthdate}
            />
            <StringInputRow
              destinationValue={destinationPerformer.death_date ?? ""}
              label={intl.formatMessage({ id: "death_date" })}
              placeholder={intl.formatMessage({ id: "date_format" })}
              render={
                !!death_date && death_date !== destinationPerformer.death_date
              }
              selectedInput={selectedDeathDate}
              setSelectedInput={setSelectedDeathDate}
              setSourceValue={setPDeathDate}
              sourceValue={pDeathDate ?? ""}
              validation={validateDeathDate}
            />
            <StringInputRow
              destinationValue={destinationPerformer.ethnicity ?? ""}
              label={intl.formatMessage({ id: "ethnicity" })}
              placeholder={intl.formatMessage({ id: "ethnicity" })}
              render={
                !!ethnicity && ethnicity !== destinationPerformer.ethnicity
              }
              selectedInput={selectedEthnicity}
              setSelectedInput={setSelectedEthnicity}
              setSourceValue={setPEthnicity}
              sourceValue={pEthnicity ?? ""}
            />
            <StringInputRow
              destinationValue={destinationPerformer.hair_color ?? ""}
              label={intl.formatMessage({ id: "hair_color" })}
              placeholder={intl.formatMessage({ id: "hair_color" })}
              render={
                !!hair_color && hair_color !== destinationPerformer.hair_color
              }
              selectedInput={selectedHairColor}
              setSelectedInput={setSelectedHairColor}
              setSourceValue={setPHairColor}
              sourceValue={pHairColor ?? ""}
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
            {intl.formatMessage({ id: "actions.cancel" })}
          </button>
          <button
            className="ml-2 btn btn-primary"
            disabled={!canSubmit}
            onClick={handleConfirm}
            type="button"
          >
            {intl.formatMessage({ id: "actions.confirm" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MergeModal;

interface MergeModalProps {
  /** Current data for the destination performer */
  destinationPerformer?: Performer;

  /** The type of modal this is. */
  mergeDirection: MergeDirection;

  /** Whether to display the modal. */
  show: boolean;

  /** Set whether to display the modal. */
  setShow: React.Dispatch<React.SetStateAction<boolean>>;

  /** Current data for the source performer */
  sourcePerformer?: Performer;
}
