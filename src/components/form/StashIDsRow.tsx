import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";
import RemoveInputButton from "./RemoveInputButton";
import { getStashboxBase } from "../../utils";

const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = PluginApi.components;
const { faRightLong } = PluginApi.libraries.FontAwesomeSolid;
const { useIntl } = PluginApi.libraries.Intl;

const StashIDListRow: React.FC<StashIDListRowProps> = (props) => {
  if (props.render === false) return null;

  // https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/locales/en-GB.json
  const intl = useIntl();

  /** Handler for the onClick event for each input remove button */
  const handleClickRemoveButton = (index: number) => {
    const updatedArray = props.sourceIDs.filter((_s, i) => i !== index);
    props.setSourceValue(updatedArray);
  };

  /** Handler for merging the destination list with the source list */
  const mergeLists = () => {
    const updatedList = [...props.destinationIDs];
    props.sourceIDs.forEach((s) => {
      // Only add non-duplicate list items
      if (updatedList.findIndex((v) => v.stash_id === s.stash_id) === -1)
        updatedList.push(s);
      props.setSourceValue(updatedList);
    });
  };

  return (
    <FormRowWrapper className="string-list-row flex-nowrap" label={props.label}>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "destination"}
          performerPosition="destination"
          setSelected={props.setSelectedInput}
        />
        <div className="string-list-input stash-id-list">
          <div className="form-group">
            {props.destinationIDs.map((s, i) => {
              return (
                <StashIDItem
                  index={i}
                  position="destination"
                  stashID={s}
                  stashBoxes={props.stashBoxes}
                />
              );
            })}
          </div>
        </div>
      </FormInputGroup>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "source"}
          performerPosition="source"
          setSelected={props.setSelectedInput}
        />
        <div className="string-list-input stash-id-list">
          <div className="form-group">
            {props.sourceIDs.map((s, i) => {
              return (
                <StashIDItem
                  index={i}
                  onClickRemoveButton={handleClickRemoveButton}
                  position="source"
                  stashID={s}
                  stashBoxes={props.stashBoxes}
                />
              );
            })}
          </div>
        </div>
      </FormInputGroup>
      <div className="col-12 d-flex mt-2">
        <button
          type="button"
          className="btn btn-secondary mx-auto"
          onClick={mergeLists}
        >
          <Icon icon={faRightLong} className="mr-1" />
          {intl.formatMessage({ id: "actions.merge_into" })}
        </button>
      </div>
    </FormRowWrapper>
  );
};

export default StashIDListRow;

interface StashIDListRowProps {
  /** The IDs array for the destination performer. */
  destinationIDs: StashIdInput[];

  /** The row label. */
  label: string;

  /** Whether to render the component or not. */
  render?: boolean;

  /** Dictates whether the destination or source value should be used on update. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source value should be used on update. */
  setSelectedInput: React.Dispatch<React.SetStateAction<PerformerPosition>>;

  /** Sets the value of the source input. */
  setSourceValue: React.Dispatch<React.SetStateAction<StashIdInput[]>>;

  /** The input value array for the source performer. */
  sourceIDs: StashIdInput[];

  /** Data for each Stash box */
  stashBoxes: StashBox[];
}

/* ---------------------------------------------------------------------------------------------- */
/*                                          Stash ID item                                         */
/* ---------------------------------------------------------------------------------------------- */

const StashIDItem: React.FC<StashIDItemProps> = (props) => {
  const { endpoint, stash_id } = props.stashID;

  const endpointName =
    props.stashBoxes.find((b) => b.endpoint === props.stashID.endpoint)?.name ??
    endpoint;

  const base = getStashboxBase(endpoint);
  const link = `${base}performers/${stash_id}`;

  const handleOnRemove: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (props.onClickRemoveButton) props.onClickRemoveButton(props.index);
  };

  // Only render the remove item button on the source side.
  const removeButton =
    props.position === "source" ? (
      <RemoveInputButton onClick={handleOnRemove} />
    ) : null;

  return (
    <div className="input-group">
      <span className="stash-id-pill pl-2" data-endpoint={endpointName}>
        <span className="stash-id-pill-title">{endpointName}</span>
        <a target="_blank" rel="noopener noreferrer" href={link}>
          {stash_id}
        </a>
      </span>
      {removeButton}
    </div>
  );
};

interface StashIDItemProps {
  /** The index of the value in the list array. */
  index: number;

  /** The function to execute after the remove button onClick event. */
  onClickRemoveButton?: (index: number) => void;

  /** Identifies which position the input is for. */
  position: PerformerPosition;

  /** The Stash ID data */
  stashID: StashIdInput;

  /** Data for each Stash box */
  stashBoxes: StashBox[];
}
