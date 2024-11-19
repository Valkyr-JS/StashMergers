import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;
const { Form } = PluginApi.libraries.Bootstrap;

const DropdownInputRow: React.FC<DropdownInputRowProps> = (props) => {
  /** Handler for select onChange events. */
  const handleSourceChange: React.ChangeEventHandler = (e) => {
    const target = e.target as HTMLSelectElement;
    props.setSourceValue(target.value);
  };

  return (
    <FormRowWrapper label={props.label}>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "destination"}
          performerPosition="destination"
          setSelected={props.setSelectedInput}
        />
        <Form.Control
          as="select"
          className="input-control"
          disabled
          value={props.destinationValue}
        >
          {props.options.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </Form.Control>
      </FormInputGroup>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "source"}
          performerPosition="source"
          setSelected={props.setSelectedInput}
        />
        <Form.Control
          as="select"
          className="input-control"
          onChange={handleSourceChange}
          value={props.sourceValue}
        >
          {props.options.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </Form.Control>
      </FormInputGroup>
    </FormRowWrapper>
  );
};

export default DropdownInputRow;

interface DropdownInputRowProps {
  /** The current value for the destination performer. */
  destinationValue: string;

  /** The row label. */
  label: string;

  /** The list of dropdown options. */
  options: string[];

  /** Dictates whether the destination or source value should be used on update. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source value should be used on update. */
  setSelectedInput: React.Dispatch<React.SetStateAction<PerformerPosition>>;

  /** Sets the value of the source input. If not provided, the input is marked
   * as read-only. */
  setSourceValue: (v: string) => void;

  /** The current value for the source performer. */
  sourceValue: string;
}
