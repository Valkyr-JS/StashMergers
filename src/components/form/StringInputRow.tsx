import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;

const StringInputRow: React.FC<StringInputRow> = (props) => {
  /** On change handler for the source input. */
  const handleSourceChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (props.setSourceValue) props.setSourceValue(e.target.value);
    if (props.validation) props.validation(e.target.value);
  };

  // If setting the source value is not available, mark the input as read-only.
  const isReadOnly = props.setSourceValue === undefined;

  const name = props.label.toLowerCase().split(" ").join("-");

  if (props.render === false) return null;

  // // If the values for destination and source are identical, or source is
  // // falsy, don't render the row.
  // console.log(props.destinationValue, props.sourceValue);
  // if (!props.sourceValue || props.destinationValue === props.sourceValue)
  //   return null;

  return (
    <FormRowWrapper label={props.label}>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "destination"}
          performerPosition="destination"
          setSelected={props.setSelectedInput}
        />
        <input
          className="bg-secondary text-white border-secondary form-control"
          name={"destination-performer-" + name}
          placeholder={props.placeholder}
          readOnly={true}
          value={props.destinationValue}
        />
      </FormInputGroup>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "source"}
          performerPosition="source"
          setSelected={props.setSelectedInput}
        />
        <input
          className="bg-secondary text-white border-secondary form-control"
          name={"source-performer-" + name}
          onChange={handleSourceChange}
          placeholder={props.placeholder}
          readOnly={isReadOnly}
          value={props.sourceValue}
        />
      </FormInputGroup>
    </FormRowWrapper>
  );
};

export default StringInputRow;

interface StringInputRow {
  /** The input value for the destination performer. */
  destinationValue: string;

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

  /** Sets the value of the source input. If not provided, the input is marked
   * as read-only. */
  setSourceValue?: React.Dispatch<
    React.SetStateAction<Maybe<string> | undefined>
  >;

  /** The input value for the source performer. */
  sourceValue: string;

  /** A function that processes the string to check if it's valid. */
  validation?: (val: string) => void;
}
