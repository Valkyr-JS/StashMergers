const { PluginApi } = window;
const { React } = PluginApi;

const FormInputGroup: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className="col-6">
      <div className="input-group">{props.children}</div>
    </div>
  );
};

export default FormInputGroup;
