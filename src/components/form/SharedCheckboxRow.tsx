import FormRowWrapper from "./FormRowWrapper";
import React from "react";

const SharedCheckboxRow: React.FC<SharedCheckboxRowProps> = (props) => {
  if (props.render === false) return null;

  /** On change handler for the input. */
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (_e) =>
    props.setValue(!props.value);

  const name = props.label.toLowerCase().split(" ").join("-");

  const description = props.description ? (
    <small>{props.description}</small>
  ) : null;

  return (
    <FormRowWrapper label={props.label}>
      <div className="col-12">
        <div className="input-group">
          <div className="form-check ml-3">
            <input
              checked={props.value}
              className="form-check-input position-static"
              id={name}
              name={name}
              onChange={handleChange}
              type="checkbox"
              value={props.value.toString()}
            />
            {description}
          </div>
        </div>
      </div>
    </FormRowWrapper>
  );
};

export default SharedCheckboxRow;

interface SharedCheckboxRowProps {
  /** An optional description diplayed below the checkbox. */
  description?: string;

  /** The row label. */
  label: string;

  /** Whether to render the component or not. */
  render?: boolean;

  /** Sets the value of the input. */
  setValue: React.Dispatch<React.SetStateAction<boolean>>;

  /** The input value. */
  value: boolean;
}
