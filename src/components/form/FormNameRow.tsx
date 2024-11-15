import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;

const FormNameRow: React.FC<FormNameRowProps> = (_props) => {
  const [selectedInput, setSelectedInput] =
    React.useState<PerformerPosition>("source");

  return (
    <FormRowWrapper label="Name">
      <div className="col-6">
        <div className="input-group">
          <div className="input-group-prepend">
            <SelectInputButton
              selected={selectedInput === "destination"}
              performerPosition="destination"
              setSelected={setSelectedInput}
            />
          </div>
          <input
            placeholder="Name"
            readOnly={true}
            className="bg-secondary text-white border-secondary form-control"
            value="Destination name"
          />
        </div>
      </div>
      <div className="col-6">
        <div className="input-group">
          <div className="input-group-prepend">
            <SelectInputButton
              selected={selectedInput === "source"}
              performerPosition="source"
              setSelected={setSelectedInput}
            />
          </div>
          <input
            placeholder="Name"
            className="bg-secondary text-white border-secondary form-control"
            value="Source name"
          />
        </div>
      </div>
    </FormRowWrapper>
  );
};

export default FormNameRow;

interface FormNameRowProps {}
