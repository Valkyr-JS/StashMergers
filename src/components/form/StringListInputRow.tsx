import { default as cx } from "classnames";
import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";
import { validateArrayContainsOnlyUniques } from "../../helpers";
import RemoveInputButton from "./RemoveInputButton";

const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = PluginApi.components;
const { faRightLong } = PluginApi.libraries.FontAwesomeSolid;
const { useIntl } = PluginApi.libraries.Intl;

const StringListInputRow: React.FC<StringListInputRowProps> = (props) => {
  if (props.render === false) return null;

  // https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/locales/en-GB.json
  const intl = useIntl();

  const [showError, setShowError] = React.useState(false);
  const [duplicateIndices, setDuplicateIndices] = React.useState<number[]>([]);

  /** Add an empty string to the end of the list if needed, to ensure there is
   * always an empty input at the end of the list. Mimics Stash native
   * functionality. */
  const addEmptyFinal = (list: string[]) => {
    const updatedList = [...list];
    if (updatedList[updatedList.length - 1] !== "") updatedList.push("");
    return updatedList;
  };

  const sourceValues = addEmptyFinal(props.sourceValue);

  /** Handler for the onChange event for each input */
  const handleInputChange = (val: string, index: number) => {
    const updatedArray = sourceValues.map((v, i) => {
      return i === index ? val : v;
    });

    props.setSourceValue(updatedArray);

    if (!props.allowDuplicates) {
      const uniqueValues: string[] = [];
      const dupeIndices: number[] = [];

      // Loop through the updated array to check for duplicate values
      updatedArray.forEach((v, i) => {
        if (uniqueValues.includes(v)) {
          // Add the item index to the dupeIndices array
          dupeIndices.push(i);
        } else {
          // Add the value to the uniqueValues array
          uniqueValues.push(v);
        }
      });

      setDuplicateIndices(dupeIndices);
    }
    setShowError(!validateArrayContainsOnlyUniques(updatedArray));
  };

  /** Handler for the onClick event for each input remove button */
  const handleClickRemoveButton = (index: number) => {
    const updatedArray = sourceValues.filter((_v, i) => i !== index);
    props.setSourceValue(updatedArray);
  };

  const listInputClasses = cx("string-list-input", {
    "is-invalid": showError,
  });

  /** Handler for merging the destination list with the source list */
  const mergeLists = () => {
    const updatedList = [...props.destinationValue];
    props.sourceValue.forEach((s) => {
      // Only add non-duplicate list items
      if (updatedList.findIndex((v) => v === s) === -1) updatedList.push(s);
      props.setSourceValue(updatedList);
    });
  };

  return (
    <FormRowWrapper className="string-list-row" label={props.label}>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "destination"}
          performerPosition="destination"
          setSelected={props.setSelectedInput}
        />
        <div className="string-list-input">
          <div className="form-group">
            {props.destinationValue.map((v, i) => {
              return (
                <StringListInputItem
                  key={i}
                  index={i}
                  position="destination"
                  placeholder={props.placeholder}
                  value={v}
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
        <div className={listInputClasses}>
          <div className="form-group">
            {sourceValues.map((v, i) => {
              return (
                <StringListInputItem
                  key={i}
                  index={i}
                  isDuplicate={duplicateIndices.includes(i)}
                  onChangeCallback={handleInputChange}
                  onClickRemoveButton={handleClickRemoveButton}
                  position="source"
                  placeholder={props.placeholder}
                  value={v}
                />
              );
            })}
          </div>
          {showError ? (
            <div className="invalid-feedback mt-n2">
              {props.label} must be unique
            </div>
          ) : null}
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={mergeLists}
          >
            <Icon icon={faRightLong} className="mr-1" />
            {intl.formatMessage({ id: "actions.merge" })}
          </button>
        </div>
      </FormInputGroup>
    </FormRowWrapper>
  );
};

export default StringListInputRow;

interface StringListInputRowProps {
  /** Whether to allow duplicate values in a list. Displays an error if false or
   * undefined. */
  allowDuplicates?: boolean;

  /** The input value array for the destination performer. */
  destinationValue: string[];

  /** The row label. */
  label: string;

  /** The input placeholder. */
  placeholder: string;

  /** Whether to render the component or not. */
  render?: boolean;

  /** Dictates whether the destination or source value should be used on update. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source value should be used on update. */
  setSelectedInput: React.Dispatch<React.SetStateAction<PerformerPosition>>;

  /** Sets the value of the source input. */
  setSourceValue: React.Dispatch<React.SetStateAction<string[]>>;

  /** The input value array for the source performer. */
  sourceValue: string[];
}

/* ---------------------------------------------------------------------------------------------- */
/*                                     String list input item                                     */
/* ---------------------------------------------------------------------------------------------- */

const StringListInputItem: React.FC<StringListInputItemProps> = (props) => {
  /** onChange handler */
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (props.onChangeCallback)
      props.onChangeCallback(e.target.value, props.index);
  };

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (props.onClickRemoveButton) props.onClickRemoveButton(props.index);
  };

  const inputClasses = cx(
    "text-input",
    { "is-invalid": props.isDuplicate },
    "form-control"
  );

  // Only render the remove item button on the source side.
  const removeButton =
    props.position === "source" ? (
      <RemoveInputButton onClick={handleOnClick} />
    ) : null;

  return (
    <div className="input-group">
      <input
        className={inputClasses}
        onChange={handleOnChange}
        placeholder={props.placeholder}
        readOnly={props.position === "destination"}
        value={props.value}
      ></input>
      {removeButton}
    </div>
  );
};

interface StringListInputItemProps {
  /** The index of the value in the list array. */
  index: number;

  /** Identifies the input value as a duplicate of a previous value. */
  isDuplicate?: boolean;

  /** The function to execute after the input onChange event. */
  onChangeCallback?: (value: string, index: number) => void;

  /** The function to execute after the remove button onClick event. */
  onClickRemoveButton?: (index: number) => void;

  /** Identifies which position the input is for. */
  position: PerformerPosition;

  /** The input placeholder. */
  placeholder: string;

  /** The input value */
  value: string;
}
