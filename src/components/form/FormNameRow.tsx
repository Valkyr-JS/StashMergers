import FormRowWrapper from "./FormRowWrapper";

const { PluginApi } = window;
const { React } = PluginApi;

const FormNameRow = () => {
  return (
    <FormRowWrapper label="Name">
      <div className="col-6">
        <div className="input-group">
          <div className="bg-secondary text-white border-secondary input-group-prepend">
            <button type="button" className="btn btn-secondary">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="xmark"
                className="svg-inline--fa fa-xmark fa-icon fa-fw text-muted"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                ></path>
              </svg>
            </button>
          </div>
          <input
            placeholder="Name"
            readOnly={true}
            className="bg-secondary text-white border-secondary form-control"
            value="Destination name"
          />
        </div>
      </div>
      <div className="col-6">
        <div className="input-group">
          <div className="input-group-prepend">
            <button type="button" className="btn btn-secondary">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="check"
                className="svg-inline--fa fa-check fa-icon fa-fw text-success"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                ></path>
              </svg>
            </button>
          </div>
          <input
            placeholder="Name"
            className="bg-secondary text-white border-secondary form-control"
            value="Source name"
          />
        </div>
      </div>
    </FormRowWrapper>
  );
};

export default FormNameRow;
