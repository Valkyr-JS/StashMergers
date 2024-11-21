import { default as cx } from "classnames";
import MergeListsButton from "./MergeListsButton";
const { React } = window.PluginApi;

const FormRowWrapper: React.FC<FormRowWrapperProps> = (props) => {
  const classes = cx("px-3", "pt-3", props.className, "row");

  const mergeButton = props.mergeListsHandler ? (
    <div>
      <MergeListsButton onClick={props.mergeListsHandler} />
    </div>
  ) : null;

  return (
    <div className={classes}>
      <div className="col-form-label col-lg-3">
        <label className="form-label">{props.label}</label>
        {mergeButton}
      </div>
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

  mergeListsHandler?: React.MouseEventHandler<HTMLButtonElement>;
}
