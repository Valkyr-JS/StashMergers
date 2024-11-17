import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = PluginApi.components;
const { faMinus } = PluginApi.libraries.FontAwesomeSolid;

const StringListInputRow: React.FC<StringListInputRowProps> = (props) => {
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
            {props.sourceValue.map((v, i) => {
              return (
                <StringListInputItem
                  key={i}
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

  /** Dictates whether the destination or source value should be used on update. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source value should be used on update. */
  setSelectedInput: React.Dispatch<React.SetStateAction<PerformerPosition>>;

  /** The input value array for the source performer. */
  sourceValue: string[];
}

const StringListInputItem: React.FC<StringListInputItemProps> = (props) => {
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
        placeholder={props.placeholder}
        readOnly={props.position === "destination"}
        value={props.value}
      ></input>
      {removeButton}
    </div>
  );
};

interface StringListInputItemProps {
  /** Identifies which position the input is for. */
  position: PerformerPosition;

  /** The input placeholder. */
  placeholder: string;

  /** The input value */
  value: string;
}
