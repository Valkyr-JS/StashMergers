import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;

const FormNameRow: React.FC<StringInputRow> = (props) => {
  const name = props.label.toLowerCase().split(" ").join("-");

  const handleSourceChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (props.setSourceValue) props.setSourceValue(e.target.value);
  };

  const isReadOnly = props.setSourceValue === undefined;

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

export default FormNameRow;

interface StringInputRow {
  /** The input value for the destination performer. */
  destinationValue: Performer["name"];

  /** The row label. */
  label: string;

  /** The input placeholder. */
  placeholder: string;

  /** Dictates whether the destination or source value should be used on update. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source value should be used on update. */
  setSelectedInput: React.Dispatch<React.SetStateAction<PerformerPosition>>;

  /** Sets the value of the source input. If not provided, the input is marked
   * as read-only. */
  setSourceValue?: React.Dispatch<React.SetStateAction<string>>;

  /** The input value for the source performer. */
  sourceValue: Performer["name"];
}
