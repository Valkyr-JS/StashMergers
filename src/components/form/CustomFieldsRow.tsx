import React from "react";
import { useIntl } from "react-intl";
import FormRowWrapper from "./FormRowWrapper";
import FormInputGroup from "./FormInputGroup";
import SelectInputButton from "./SelectInputButton";

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

  /** A pre-ordered array of the custom field property keys. */
  labels: string[];

  /** Dictates whether the destination or source value should be used on update. */
  selectedInputs: PerformerPosition[];

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

  const [selectedInput, setSelectedInput] = React.useState(props.selectedInput);

  React.useEffect(
    () => props.setSelectedInput(selectedInput, props.index),
    [selectedInput]
  );

  return (
    <FormRowWrapper label={props.label}>
      <FormInputGroup>
        <SelectInputButton
          performerPosition="destination"
          selected={selectedInput === "destination"}
          setSelected={setSelectedInput}
        />
        <MixedInputGroup
          index={props.index}
          name={name}
          position="destination"
          value={props.destinationValue}
        />
      </FormInputGroup>
      <FormInputGroup>
        <SelectInputButton
          performerPosition="source"
          selected={selectedInput === "source"}
          setSelected={setSelectedInput}
        />
        <MixedInputGroup
          index={props.index}
          name={name}
          position="source"
          setSourceValue={props.setSourceValue}
          value={props.sourceValue}
        />
      </FormInputGroup>
    </FormRowWrapper>
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

  /** The custom field value for the source performer. */
  sourceValue: CustomFieldValue;
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
    case "boolean":
      /** On change handler for the source input. */
      const handleBooleanSourceChange:
        | React.ChangeEventHandler<HTMLInputElement>
        | undefined = isReadOnly
        ? undefined
        : () => {
            if (props.setSourceValue)
              props.setSourceValue(!props.value, props.index);
          };

      return (
        <div className="form-check ml-3">
          <input
            checked={props.value}
            className="form-check-input position-static"
            id={props.position + "-" + props.name}
            name={props.position + "-" + props.name}
            onChange={handleBooleanSourceChange}
            type="checkbox"
            value={props.value.toString()}
          />
        </div>
      );
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
      // Treat all other types as a string
      const stringValue = JSON.stringify(props.value);

      /** On change handler for the source input. */
      const handleStringSourceChange:
        | React.ChangeEventHandler<HTMLInputElement>
        | undefined = isReadOnly
        ? undefined
        : (e) => {
            if (props.setSourceValue)
              props.setSourceValue(JSON.parse(e.target.value), props.index);
          };

      return (
        <input
          className="bg-secondary text-white border-secondary form-control"
          name={props.position + "-" + props.name}
          onChange={handleStringSourceChange}
          readOnly={isReadOnly}
          value={stringValue}
        />
      );
  }
};

interface MixedInputGroupProps {
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
