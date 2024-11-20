import { default as cx } from "classnames";
import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;

const CheckboxRow: React.FC<CheckboxRowProps> = (props) => {
  if (props.render === false) return null;

  const [checked, setChecked] = React.useState(props.sourceValue);

  /** On change handler for the source input. */
  const handleSourceChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (props.setSourceValue) {
      props.setSourceValue(!checked);
      setChecked(!checked);
    }
  };

  const name = props.label.toLowerCase().split(" ").join("-");

  return (
    <FormRowWrapper label={props.label}>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "destination"}
          performerPosition="destination"
          setSelected={props.setSelectedInput}
        />
        <div className="form-check ml-3">
          <input
            checked={props.destinationValue}
            className="form-check-input position-static"
            id={name + "-destination"}
            name={name + "-destination"}
            type="checkbox"
            value={props.destinationValue.toString()}
          />
        </div>
      </FormInputGroup>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "source"}
          performerPosition="source"
          setSelected={props.setSelectedInput}
        />
        <div className="form-check ml-3">
          <input
            checked={checked}
            className="form-check-input position-static"
            id={name + "-source"}
            name={name + "-source"}
            onChange={handleSourceChange}
            type="checkbox"
            value={props.sourceValue.toString()}
          />
        </div>
      </FormInputGroup>
    </FormRowWrapper>
  );
};

export default CheckboxRow;

interface CheckboxRowProps {
  /** The input value for the destination performer. */
  destinationValue: boolean;

  /** The row label. */
  label: string;

  /** Whether to render the component or not. */
  render?: boolean;

  /** Dictates whether the destination or source value should be used on update. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source value should be used on update. */
  setSelectedInput: React.Dispatch<React.SetStateAction<PerformerPosition>>;

  /** Sets the value of the source input. */
  setSourceValue: React.Dispatch<React.SetStateAction<boolean>>;

  /** The input value for the source performer. */
  sourceValue: boolean;
}
