import { default as cx } from "classnames";
const { React } = window.PluginApi;

const FormRowWrapper: React.FC<FormRowWrapperProps> = (props) => {
  const classes = cx("px-3", "pt-3", props.className, "row");

  return (
    <div className={classes}>
      <label className="form-label col-form-label col-lg-3">
        {props.label}
      </label>
      <div className="col-lg-9">
        <div className="row">{props.children}</div>
      </div>
    </div>
  );
};

export default FormRowWrapper;

interface FormRowWrapperProps extends React.PropsWithChildren {
  /** Additional classnames */
  className?: string;

  /** The row title, displayed in the leftmost column. */
  label: string;
}
