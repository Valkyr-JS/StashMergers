import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;

const FormNameRow: React.FC<FormNameRowProps> = (props) => {
  return (
    <FormRowWrapper label="Name">
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "destination"}
          performerPosition="destination"
          setSelected={props.setSelectedInput}
        />
        <input
          className="bg-secondary text-white border-secondary form-control"
          name="destination-performer-name"
          placeholder="Name"
          readOnly={true}
          value={props.destinationName}
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
          name="source-performer-name"
          onChange={(e) => props.setSourceName(e.target.value)}
          placeholder="Name"
          value={props.sourceName}
        />
      </FormInputGroup>
    </FormRowWrapper>
  );
};

export default FormNameRow;

interface FormNameRowProps {
  /** Name for the destination performer */
  destinationName: Performer["name"];

  /** Dictates whether the destination or source name should be used. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source name should be used. */
  setSelectedInput: React.Dispatch<React.SetStateAction<PerformerPosition>>;

  setSourceName: React.Dispatch<React.SetStateAction<string>>;

  /** Name for the source performer */
  sourceName: Performer["name"];
}
