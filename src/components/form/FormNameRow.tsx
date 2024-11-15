import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;

const FormNameRow: React.FC<FormNameRowProps> = (props) => {
  const [selectedInput, setSelectedInput] =
    React.useState<PerformerPosition>("source");

  return (
    <FormRowWrapper label="Name">
      <FormInputGroup>
        <SelectInputButton
          selected={selectedInput === "destination"}
          performerPosition="destination"
          setSelected={setSelectedInput}
        />
        <input
          placeholder="Name"
          readOnly={true}
          className="bg-secondary text-white border-secondary form-control"
          value={props.destinationName}
        />
      </FormInputGroup>
      <FormInputGroup>
        <SelectInputButton
          selected={selectedInput === "source"}
          performerPosition="source"
          setSelected={setSelectedInput}
        />
        <input
          placeholder="Name"
          className="bg-secondary text-white border-secondary form-control"
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

  /** Name for the source performer */
  sourceName: Performer["name"];
}
