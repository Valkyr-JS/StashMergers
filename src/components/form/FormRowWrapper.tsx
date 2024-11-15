const { PluginApi } = window;
const { React } = PluginApi;

const FormRowWrapper: React.FC<FormRowWrapperProps> = (props) => {
  return (
    <div className="px-3 pt-3 row">
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
  /** The row title, displayed in the leftmost column. */
  label: string;
}
