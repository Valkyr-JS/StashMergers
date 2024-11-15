import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;

const FormNameRow: React.FC<FormNameRowProps> = (_props) => {
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
          value="Destination name"
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
          value="Source name"
        />
      </FormInputGroup>
    </FormRowWrapper>
  );
};

export default FormNameRow;

interface FormNameRowProps {}
