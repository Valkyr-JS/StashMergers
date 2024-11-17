import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = PluginApi.components;
const { faMinus } = PluginApi.libraries.FontAwesomeSolid;

const StringListInputRow: React.FC<StringListInputRowProps> = (props) => {
  if (props.render === false) return null;

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
    const updatedState = sourceValues.map((v, i) => {
      return i === index ? val : v;
    });

    props.setSourceValue(updatedState);
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
        <div className="string-list-input">
          <div className="form-group">
            {sourceValues.map((v, i) => {
              return (
                <StringListInputItem
                  key={i}
                  index={i}
                  onChangeCallback={handleInputChange}
                  position="source"
                  placeholder={props.placeholder}
                  value={v}
                />
              );
            })}
          </div>
        </div>
      </FormInputGroup>
    </FormRowWrapper>
  );
};

export default StringListInputRow;

interface StringListInputRowProps {
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

  // Only render the remove item button on the source side.
  const removeButton =
    props.position === "source" ? (
      <div className="input-group-append">
        <button type="button" className="btn btn-danger">
          <Icon icon={faMinus} />
        </button>
      </div>
    ) : null;

  return (
    <div className="input-group">
      <input
        className="text-input form-control"
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

  /** The function to execute after the input onChange event. */
  onChangeCallback?: (value: string, index: number) => void;

  /** Identifies which position the input is for. */
  position: PerformerPosition;

  /** The input placeholder. */
  placeholder: string;

  /** The input value */
  value: string;
}
