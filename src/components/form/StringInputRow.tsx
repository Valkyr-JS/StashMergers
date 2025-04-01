import { default as cx } from "classnames";
import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";
import React from "react";

const { PluginApi } = window;

const StringInputRow: React.FC<StringInputRowProps> = (props) => {
  /** On change handler for the source input. */
  const handleSourceChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (props.setSourceValue) props.setSourceValue(e.target.value);
    if (props.validation) props.validation(e.target.value);
  };

  const name = props.label.toLowerCase().split(" ").join("-");

  if (props.render === false) return null;

  return (
    <FormRowWrapper label={props.label}>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "destination"}
          performerPosition="destination"
          setSelected={props.setSelectedInput}
        />
        <InputComponent
          name={name}
          placeholder={props.placeholder}
          position="destination"
          isTextArea={props.isTextArea}
          value={props.destinationValue}
        />
      </FormInputGroup>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "source"}
          performerPosition="source"
          setSelected={props.setSelectedInput}
        />
        <InputComponent
          name={name}
          onChange={handleSourceChange}
          placeholder={props.placeholder}
          position="source"
          isTextArea={props.isTextArea}
          value={props.sourceValue}
        />
      </FormInputGroup>
    </FormRowWrapper>
  );
};

export default StringInputRow;

interface StringInputRowProps {
  /** The input value for the destination performer. */
  destinationValue: string;

  /** If `true`, the input is replaced with a textarea. */
  isTextArea?: boolean;

  /** The row label. */
  label: string;

  /** The input placeholder. */
  placeholder: string;

  /** Whether to render the component or not. */
  render?: boolean;

  /** Dictates whether the destination or source value should be used on update. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source value should be used on update. */
  setSelectedInput: React.Dispatch<React.SetStateAction<PerformerPosition>>;

  /** Sets the value of the source input. If not provided, the input is marked
   * as read-only. */
  setSourceValue?: React.Dispatch<
    React.SetStateAction<Maybe<string> | undefined>
  >;

  /** The input value for the source performer. */
  sourceValue: string;

  /** A function that processes the string to check if it's valid. */
  validation?: (val: string) => void;
}

/* ---------------------------------------------------------------------------------------------- */
/*                                         Input component                                        */
/* ---------------------------------------------------------------------------------------------- */

const InputComponent: React.FC<InputComponentProps> = (props) => {
  const isReadOnly =
    props.position === "destination" || props.onChange === undefined;

  const classes = cx(
    "bg-secondary",
    "text-white",
    "border-secondary",
    { "scene-description": props.isTextArea },
    "form-control"
  );

  if (props.isTextArea) {
    return (
      <textarea
        className={classes}
        name={props.position + "-performer-" + props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        readOnly={isReadOnly}
        value={props.value}
      />
    );
  }

  return (
    <input
      className={classes}
      name={props.position + "-performer-" + props.name}
      onChange={props.onChange}
      placeholder={props.placeholder}
      readOnly={isReadOnly}
      value={props.value}
    />
  );
};

interface InputComponentProps {
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder: StringInputRowProps["placeholder"];
  position: PerformerPosition;
  isTextArea?: StringInputRowProps["isTextArea"];
  value:
    | StringInputRowProps["destinationValue"]
    | StringInputRowProps["sourceValue"];
}
