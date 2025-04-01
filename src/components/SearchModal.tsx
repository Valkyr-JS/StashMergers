import { IntlShape } from "react-intl";
import { fetchPerformerData, fetchStudioData } from "../helpers";

const { PluginApi } = window;
const { React } = PluginApi;
const { Icon } = PluginApi.components;
const { Modal } = PluginApi.libraries.Bootstrap;
const { faRightToBracket, faRightFromBracket } =
  PluginApi.libraries.FontAwesomeSolid;

const SearchModal: React.FC<SearchModalProps> = ({intl, ...props}) => {

  const heading = !!intl ? intl.formatMessage({
    id:
      props.mergeDirection === "from"
        ? "actions.merge_from"
        : "actions.merge_into",
  }) : props.mergeDirection === "from" ? "Merge from" : "Merge into";

  /* -------------------------------------------- Modal ------------------------------------------- */

  /** Handler for closing the modal. */
  const handleCloseModal = () => {
    props.setShow(false);
    props.setSelected(undefined);
  };

  /** Handler for clicking the confirm button. */
  const handleConfirmButtonClick = () => {
    props.setShow(false);
    props.setShowMergeModal(true);
  };

  const modalIcon =
    props.mergeDirection === "from" ? faRightToBracket : faRightFromBracket;

  const searchType = !!intl ? intl.formatMessage({
    id:
      props.mergeDirection === "from"
        ? "dialogs.merge.source"
        : "dialogs.merge.destination",
  }) : props.mergeDirection === "from" ? "Source" : "Destination";

  /* ------------------------------------- Performer selection ------------------------------------ */

  const [showWarning, setShowWarning] = React.useState(false);

  // Wait for PluginApi components to load before rendering.
  const componentsLoading = PluginApi.hooks.useLoadComponents([
    PluginApi.loadableComponents.PerformerSelect,
  ]);

  if (componentsLoading) return null;
  const { PerformerSelect, StudioSelect } = PluginApi.components;

  /** Handler for selecting an item in the selection list */
  const handleSelect = (items: (typeof props.this)[]) => {
    if (items.length) {
      const selection = items[0];

      props.type === "performer"
        ? fetchPerformerData(selection.id).then((res) => props.setSelected(res))
        : fetchStudioData(selection.id).then((res) => props.setSelected(res));

      // Check the selected item isn't the current item, and warn if it is.
      setShowWarning(selection.id === props.this.id);
    }
  };

  const selector =
    props.type === "performer" ? (
      <PerformerSelect
        active={!!props.selected?.id}
        creatable={false}
        isClearable={false}
        onSelect={handleSelect}
        values={props.selected ? [props.selected] : []}
      />
    ) : (
      <StudioSelect
        active={!!props.selected?.id}
        creatable={false}
        isClearable={false}
        onSelect={handleSelect}
        values={props.selected ? [props.selected] : []}
      />
    );

  /* ------------------------------------------ Component ----------------------------------------- */

  return (
    <Modal className="merge-performers-search-modal" show={props.show}>
      <Modal.Header>
        <Icon icon={modalIcon} />
        <span>{heading}</span>
      </Modal.Header>
      <Modal.Body>
        <div className="form-container row px-3">
          <div className="col-12 col-lg-6 col-xl-12">
            <div className="form-group row">
              <label
                htmlFor={searchType.toLowerCase()}
                className="form-label col-form-label col-xl-12 col-sm-3"
              >
                {searchType}
              </label>
              <div className="col-xl-12 col-sm-9">
                {selector}
                <Warning show={showWarning}>
                  Source and destination {props.type}s cannot match.
                </Warning>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ marginLeft: "auto" }}>
          <button
            className="btn btn-secondary"
            onClick={handleCloseModal}
            type="button"
          >
            {!!intl ? intl.formatMessage({ id: "actions.cancel" }) : "Cancel"}
          </button>
          <button
            className="ml-2 btn btn-primary"
            disabled={!props.selected || showWarning}
            onClick={handleConfirmButtonClick}
            type="button"
          >
            {!!intl ? intl.formatMessage({ id: "actions.confirm" }) : "Confirm"}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModal;

type SearchModalProps = (PerformerSearchModalProps | StudioSearchModalProps) & {
  intl?: IntlShape;

  /** The type of modal this is. */
  mergeDirection: MergeDirection;

  /** Set whether to display the modal. */
  setShow: React.Dispatch<React.SetStateAction<boolean>>;

  /** Set whether to display the merge modal. */
  setShowMergeModal: React.Dispatch<React.SetStateAction<boolean>>;

  /** Whether to display the modal. */
  show: boolean;
};

interface PerformerSearchModalProps {
  selected?: Performer;

  setSelected: React.Dispatch<React.SetStateAction<Performer | undefined>>;

  /** Data for the performer whose profile page is currently open. */
  this: Performer;

  type: "performer";
}

interface StudioSearchModalProps {
  selected?: Studio;

  setSelected: React.Dispatch<React.SetStateAction<Studio | undefined>>;

  /** Data for the studio whose profile page is currently open. */
  this: Studio;

  type: "studio";
}

/* ---------------------------------------------------------------------------------------------- */
/*                                             Warning                                            */
/* ---------------------------------------------------------------------------------------------- */

const Warning: React.FC<WarningProps> = (props) => {
  if (!props.show) return null;

  return <div className="invalid-feedback">{props.children}</div>;
};

interface WarningProps extends React.PropsWithChildren {
  show: boolean;
}
