import React from "react";
import FormRowWrapper from "./FormRowWrapper";
import FormInputGroup from "./FormInputGroup";
import SelectInputButton from "./SelectInputButton";

/* ---------------------------------------------------------------------------------------------- */
/*                                CustomFieldsPropertyRow component                               */
/* ---------------------------------------------------------------------------------------------- */

const CustomFieldsPropertyRow: React.FC<CustomFieldsPropertyRowProps> = (
  props
) => {
  const name = props.label.toLowerCase().split(" ").join("-");

  return (
    <FormRowWrapper label={props.label}>
      <FormInputGroup>
        <SelectInputButton
          performerPosition="destination"
          selected={props.selectedInput === "destination"}
          setSelected={props.setSelectedInput}
        />
        <MixedInputGroup
          name={name}
          position="destination"
          value={props.destinationValue}
        />
      </FormInputGroup>
      <FormInputGroup>
        <SelectInputButton
          performerPosition="source"
          selected={props.selectedInput === "source"}
          setSelected={props.setSelectedInput}
        />
        <MixedInputGroup
          name={name}
          position="source"
          setSourceValue={props.setSourceValue}
          value={props.sourceValue}
        />
      </FormInputGroup>
    </FormRowWrapper>
  );
};

type CustomFieldValue = unknown;

interface CustomFieldsPropertyRowProps {
  /** The custom field value for the destination performer. */
  destinationValue: CustomFieldValue;

  /** The row label. */
  label: string;

  /** Dictates whether the destination or source value should be used on update. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source value should be used on update. */
  setSelectedInput: React.Dispatch<React.SetStateAction<PerformerPosition>>;

  /** Sets the value of the source input. If not provided, the input is marked
   * as read-only. */
  setSourceValue: React.Dispatch<React.SetStateAction<CustomFieldValue>>;

  /** The custom field value for the source performer. */
  sourceValue: CustomFieldValue;
}

/* ---------------------------------------------------------------------------------------------- */
/*                                    MixedInputGroup component                                   */
/* ---------------------------------------------------------------------------------------------- */

const MixedInputGroup: React.FC<MixedInputGroupProps> = (props) => {
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
            if (props.setSourceValue) props.setSourceValue(!props.value);
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
            if (props.setSourceValue) props.setSourceValue(+e.target.value);
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
      return null;
    default:
      // Treat all other types as a string
      const stringValue = JSON.stringify(props.value);

      /** On change handler for the source input. */
      const handleStringSourceChange:
        | React.ChangeEventHandler<HTMLInputElement>
        | undefined = isReadOnly
        ? undefined
        : (e) => {
            if (props.setSourceValue) props.setSourceValue(e.target.value);
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
