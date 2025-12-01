import React from "react";
import { useIntl } from "react-intl";
import FormInputGroup from "./FormInputGroup";
import SelectInputButton from "./SelectInputButton";
import RemoveInputButton from "./RemoveInputButton";

const CustomFieldsRow: React.FC<CustomFieldsRowProps> = (props) => {
  // https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/locales/en-GB.json
  const intl = useIntl();

  const handleUpdateSource = (val: CustomFieldValue, index: number) => {
    const updatedSourceValues = props.sourceValues.map((v, i) =>
      i === index ? val : v
    );
    props.setSourceValues(updatedSourceValues);
  };

  const handleUpdateSelected = (position: PerformerPosition, index: number) => {
    const updatedSelectedPositions = props.selectedInputs.map((p, i) =>
      i === index ? position : p
    );
    props.setSelectedInputs(updatedSelectedPositions);
  };

  const handleRemoveField = (value: boolean, index: number) => {
    const updatedFieldsToRemove = props.fieldsToRemove.map((r, i) =>
      i === index ? value : r
    );
    props.setFieldsToRemove(updatedFieldsToRemove);
  };

  return (
    <>
      <div className="px-3 pt-3 row">
        <div className="col-lg-3" />
        <div className="col-lg-9">
          <h5>{intl.formatMessage({ id: "custom_fields.title" })}</h5>
        </div>
      </div>
      {props.labels.map((label, i) => (
        <CustomFieldsPropertyRow
          destinationValue={props.destinationValues[i]}
          index={i}
          label={label}
          selectedInput={props.selectedInputs[i] ?? "source"}
          sourceValue={props.sourceValues[i]}
          setSourceValue={handleUpdateSource}
          setSelectedInput={handleUpdateSelected}
          setWillRemove={handleRemoveField}
          willRemove={props.fieldsToRemove[i]}
        />
      ))}
    </>
  );
};

export default CustomFieldsRow;

interface CustomFieldsRowProps {
  /** A pre-ordered array of the destination performer's custom field property
   * values. */
  destinationValues: CustomFieldValue[];

  /** A pre-ordered array of booleans indicating whether a field should be
   * removed from the final merge. */
  fieldsToRemove: boolean[];

  /** A pre-ordered array of the custom field property keys. */
  labels: string[];

  /** Dictates whether the destination or source value should be used on update. */
  selectedInputs: PerformerPosition[];

  /** Sets the array of fields to be removed on merge. */
  setFieldsToRemove: React.Dispatch<React.SetStateAction<boolean[]>>;

  /** Sets the array of performer positions for the inputs. */
  setSelectedInputs: React.Dispatch<React.SetStateAction<PerformerPosition[]>>;

  /** Sets the array of values of the source inputs. */
  setSourceValues: React.Dispatch<React.SetStateAction<CustomFieldValue[]>>;

  /** A pre-ordered array of the source performer's custom field property
   * values. */
  sourceValues: CustomFieldValue[];
}

/* ---------------------------------------------------------------------------------------------- */
/*                                CustomFieldsPropertyRow component                               */
/* ---------------------------------------------------------------------------------------------- */

const CustomFieldsPropertyRow: React.FC<CustomFieldsPropertyRowProps> = (
  props
) => {
  const name = props.label.toLowerCase().split(" ").join("-");

  /* ----------------------------------- Toggle remove property ----------------------------------- */

  const removeButtonLabel = `${props.willRemove ? "Don't remove" : "Remove"} ${
    props.label
  } from the merged custom fields`;

  const styles: React.CSSProperties = {
    backgroundColor: props.willRemove ? "#00000025" : undefined,
  };

  const handleSelectInput = (position: PerformerPosition) =>
    props.setSelectedInput(position, props.index);

  const handleRemoveField = () =>
    props.setWillRemove(!props.willRemove, props.index);

  /* ------------------------------------------ Component ----------------------------------------- */

  return (
    <div className="px-3 pt-3 row" style={styles}>
      <div className="col-form-label col-lg-3">
        <label className="form-label">{props.label}</label>
      </div>
      <div className="col-lg-8">
        <div className="row">
          <FormInputGroup>
            <SelectInputButton
              disabled={props.willRemove}
              performerPosition="destination"
              selected={props.selectedInput === "destination"}
              setSelected={() => handleSelectInput("destination")}
            />
            <MixedInputGroup
              disabled={props.willRemove}
              index={props.index}
              name={name}
              position="destination"
              value={props.destinationValue}
            />
          </FormInputGroup>
          <FormInputGroup>
            <SelectInputButton
              disabled={props.willRemove}
              performerPosition="source"
              selected={props.selectedInput === "source"}
              setSelected={() => handleSelectInput("source")}
            />
            <MixedInputGroup
              disabled={props.willRemove}
              index={props.index}
              name={name}
              position="source"
              setSourceValue={props.setSourceValue}
              value={props.sourceValue}
            />
          </FormInputGroup>
        </div>
      </div>
      <div className="col-lg-1">
        <RemoveInputButton
          onClick={handleRemoveField}
          title={removeButtonLabel}
          toggleState={props.willRemove}
        />
      </div>
    </div>
  );
};

interface CustomFieldsPropertyRowProps {
  /** The custom field value for the destination performer. */
  destinationValue: CustomFieldValue;

  /** The zero-based index of the custom fields row. */
  index: number;

  /** The row label. */
  label: string;

  /** Dictates whether the destination or source value should be used on update. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source value should be used on update. */
  setSelectedInput: (position: PerformerPosition, index: number) => void;

  /** Sets the value of the source input. If not provided, the input is marked
   * as read-only. */
  setSourceValue?: (value: CustomFieldValue, index: number) => void;

  /** Marks the field for removal on merge. */
  setWillRemove: (value: boolean, index: number) => void;

  /** The custom field value for the source performer. */
  sourceValue: CustomFieldValue;

  /** Dictates whether the field has been marked for removal on merge. */
  willRemove: boolean;
}

/* ---------------------------------------------------------------------------------------------- */
/*                                    MixedInputGroup component                                   */
/* ---------------------------------------------------------------------------------------------- */

const MixedInputGroup: React.FC<MixedInputGroupProps> = (props) => {
  // https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/locales/en-GB.json
  const intl = useIntl();

  const isReadOnly =
    props.position === "destination" || props.setSourceValue === undefined;
  switch (typeof props.value) {
    case "number":
      /** On change handler for the source input. */
      const handleNumberSourceChange:
        | React.ChangeEventHandler<HTMLInputElement>
        | undefined = isReadOnly
        ? undefined
        : (e) => {
            if (props.setSourceValue)
              props.setSourceValue(+e.target.value, props.index);
          };

      return (
        <input
          className="bg-secondary text-white border-secondary form-control"
          disabled={props.disabled}
          name={props.position + "-" + props.name}
          onChange={handleNumberSourceChange}
          readOnly={isReadOnly}
          type="number"
          value={props.value}
        />
      );

    case "undefined":
      return (
        <code className="bg-secondary text-white border-secondary form-control">
          {intl.formatMessage({ id: "none" })}
        </code>
      );
    default:
      // If the value is not a string, convert it to one. Don't convert values
      // that are already strings, to avoid double-quotes in the input.
      const stringValue =
        typeof props.value === "string"
          ? props.value
          : JSON.stringify(props.value);

      /** On change handler for the source input. */
      const handleStringSourceChange:
        | React.ChangeEventHandler<HTMLInputElement>
        | undefined = isReadOnly
        ? undefined
        : (e) => {
            // Convert the value back from a string if it wasn't one previously.
            const updatedValue =
              typeof props.value === "string"
                ? e.target.value
                : JSON.parse(e.target.value);

            if (props.setSourceValue)
              props.setSourceValue(updatedValue, props.index);
          };

      return (
        <input
          className="bg-secondary text-white border-secondary form-control"
          disabled={props.disabled}
          name={props.position + "-" + props.name}
          onChange={handleStringSourceChange}
          readOnly={isReadOnly}
          value={stringValue}
        />
      );
  }
};

interface MixedInputGroupProps {
  /** Denotes if the button has been marked as disabled.  */
  disabled: boolean;

  /** The zero-based index of the custom fields row. */
  index: number;

  /** The name attribute value */
  name: string;

  /** The custom field value for the position performer. */
  position: PerformerPosition;

  /** Sets the value of the source input. If not provided, the input is marked
   * as read-only. */
  setSourceValue?: CustomFieldsPropertyRowProps["setSourceValue"];

  /** The custom field value for the position performer. */
  value: CustomFieldValue;
}
