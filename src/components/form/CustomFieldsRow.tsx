import React from "react";
import FormRowWrapper from "./FormRowWrapper";
import FormInputGroup from "./FormInputGroup";
import SelectInputButton from "./SelectInputButton";

const CustomFieldsPropertyRow: React.FC<CustomFieldsPropertyRowProps> = (
  props
) => {
  const name = props.label.toLowerCase().split(" ").join("-");

  const renderInputGroup = (
    value: CustomFieldValue,
    position: PerformerPosition
  ) => {
    const isReadOnly = position === "destination";
    switch (typeof value) {
      case "boolean":
        /** On change handler for the source input. */
        const handleBooleanSourceChange:
          | React.ChangeEventHandler<HTMLInputElement>
          | undefined = isReadOnly
          ? undefined
          : () => props.setSourceValue(!props.sourceValue);

        return (
          <div className="form-check ml-3">
            <input
              checked={value}
              className="form-check-input position-static"
              id={name + "-" + position}
              name={name + "-" + position}
              onChange={handleBooleanSourceChange}
              type="checkbox"
              value={value.toString()}
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
            name={position + "-" + name}
            onChange={handleNumberSourceChange}
            readOnly={isReadOnly}
            type="number"
            value={value}
          />
        );

      case "undefined":
        return null;
      default:
        // Treat all other types as a string
        const stringValue = JSON.stringify(value);

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
            name={position + "-" + name}
            onChange={handleStringSourceChange}
            readOnly={isReadOnly}
            value={stringValue}
          />
        );
    }
  };

  return (
    <FormRowWrapper label={props.label}>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "destination"}
          performerPosition="destination"
          setSelected={props.setSelectedInput}
        />
        {renderInputGroup(props.destinationValue, "destination")}
      </FormInputGroup>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "source"}
          performerPosition="source"
          setSelected={props.setSelectedInput}
        />
        {renderInputGroup(props.sourceValue, "source")}
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
