import MergeDropdownButton from "./components/MergeDropdownButton";
import type { MergeDropdownButtonProps } from "./components/MergeDropdownButton";
import MergeModal from "./components/MergeModal";
import SearchModal from "./components/SearchModal";
import { mergeButtonRootID, mergeStudioRootID } from "./constants";
import {
  fetchData,
  fetchPerformerData,
  fetchStudioData,
  waitForEl,
} from "./helpers";
import "./styles.scss";

const { PluginApi } = window;
const { React, ReactDOM } = PluginApi;
const { useIntl } = PluginApi.libraries.Intl;

/* ---------------------------------------------------------------------------------------------- */
/*                                             Shared                                             */
/* ---------------------------------------------------------------------------------------------- */

const createMergeButton = async (props: MergeDropdownButtonProps) => {
  // Find .details-edit which contains the editing buttons under the studio
  // details.
  const elDetailsEdit = await waitForEl(".details-edit");
  const elDeleteButton = elDetailsEdit?.querySelector("button.delete");

  // Check if the merge button has already rendered to avoid re-rendering on
  // scroll.
  const mergeBtnExists =
    document.querySelector("#" + mergeButtonRootID) !== null;

  if (elDetailsEdit && !mergeBtnExists) {
    // Create the root for the buttons
    const elButtonRoot = document.createElement("div");
    elButtonRoot.setAttribute("id", mergeButtonRootID);

    // If the delete button has been found, set the button root before it.
    // Otherwise, add it to the end of the .details-edit container.
    elDeleteButton
      ? elDeleteButton.before(elButtonRoot)
      : elDetailsEdit.append(elButtonRoot);

    // Deprecated in React but still available via the Plugin API at time of
    // development.
    ReactDOM.render(<MergeDropdownButton {...props} />, elButtonRoot);
  }
};

/* ---------------------------------------------------------------------------------------------- */
/*                                         Performer page                                         */
/* ---------------------------------------------------------------------------------------------- */

// Wait for the performer details panel to load, as this contains the
PluginApi.patch.instead("PerformerDetailsPanel", function (props, _, Original) {
  // https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/locales/en-GB.json
  const intl = useIntl();

  /* ----------------------------------------- Fetch data ----------------------------------------- */

  const [stashboxes, setStashboxes] = React.useState<StashBox[]>([]);
  const [thisPerformer, setThisPerformer] = React.useState<
    Performer | undefined
  >(undefined);

  const query = `query { configuration { general { stashBoxes { endpoint name } } } }`;

  React.useEffect(() => {
    // Fetch Stashbox config data
    fetchData<{ data: { configuration: ConfigResult } }>(query).then((res) => {
      console.log(res);
      if (res?.data) setStashboxes(res.data.configuration.general.stashBoxes);
    });

    // Fetch data for the peformer whose page we're on.
    fetchPerformerData(props.performer.id).then((res) => setThisPerformer(res));
  }, []);

  /* ---------------------------------------- Search modal ---------------------------------------- */

  const [showSearchModal, setShowSearchModal] = React.useState(false);
  const [mergeDirection, setMergeDirection] =
    React.useState<MergeDirection>("from");
  const [selectedPerformer, setSelectedPerformer] = React.useState<
    Performer | undefined
  >();

  /** Handler for clicking the "Merge from..." button. */
  const handleMergeFromClick: React.MouseEventHandler<
    HTMLAnchorElement
  > = () => {
    setMergeDirection("from");
    setShowSearchModal(true);
  };

  /** Handler for clicking the "Merge into..." button. */
  const handleMergeIntoClick: React.MouseEventHandler<
    HTMLAnchorElement
  > = () => {
    setMergeDirection("into");
    setShowSearchModal(true);
  };

  /* ----------------------------------------- Merge modal ---------------------------------------- */

  const [showMergeModal, setShowMergeModal] = React.useState(false);

  const destinationPerformer =
    mergeDirection === "into" ? selectedPerformer : thisPerformer;

  const sourcePerformer =
    mergeDirection === "from" ? selectedPerformer : thisPerformer;

  /* ------------------------------------ Merge dropdown button ----------------------------------- */

  createMergeButton({
    intl,
    mergeFromClickHandler: handleMergeFromClick,
    mergeIntoClickHandler: handleMergeIntoClick,
  });

  /* ------------------------------------------ Component ----------------------------------------- */

  if (!thisPerformer) return [<Original {...props} />];

  return [
    <>
      <Original {...props} />
      <SearchModal
        intl={intl}
        mergeDirection={mergeDirection}
        selected={selectedPerformer}
        setSelected={setSelectedPerformer}
        setShow={setShowSearchModal}
        setShowMergeModal={setShowMergeModal}
        show={showSearchModal}
        this={thisPerformer}
        type="performer"
      />
      <MergeModal
        destinationPerformer={destinationPerformer}
        mergeDirection={mergeDirection}
        setShow={setShowMergeModal}
        show={showMergeModal}
        sourcePerformer={sourcePerformer}
        stashBoxes={stashboxes}
      />
    </>,
  ];
});

/* ---------------------------------------------------------------------------------------------- */
/*                                           Studio page                                          */
/* ---------------------------------------------------------------------------------------------- */

// The studio page is not currently patchable using the plugin API, so for now
// it is implemented using a check to see what page is currently loaded. This is
// done on the initial load, and again on each page change.

const StudioModalsWrapper: React.FC<StudioModalsWrapperProps> = (props) => {
  /* ----------------------------------------- Fetch data ----------------------------------------- */

  const [stashboxes, setStashboxes] = React.useState<StashBox[]>([]);
  const [thisStudio, setThisStudio] = React.useState<Studio | undefined>(
    undefined
  );

  const query = `query { configuration { general { stashBoxes { endpoint name } } } }`;

  React.useEffect(() => {
    // Fetch Stashbox config data
    fetchData<{ data: { configuration: ConfigResult } }>(query).then((res) => {
      console.log(res);
      if (res?.data) setStashboxes(res.data.configuration.general.stashBoxes);
    });

    // Fetch data for the studio whose page we're on.
    fetchStudioData(props.studioID).then((res) => setThisStudio(res));
  }, []);

  /* ---------------------------------------- Search modal ---------------------------------------- */

  const [showSearchModal, setShowSearchModal] = React.useState(false);
  const [mergeDirection, setMergeDirection] =
    React.useState<MergeDirection>("from");
  const [selectedStudio, setSelectedStudio] = React.useState<
    Studio | undefined
  >();

  /** Handler for clicking the "Merge from..." button. */
  const handleMergeFromClick: React.MouseEventHandler<
    HTMLAnchorElement
  > = () => {
    setMergeDirection("from");
    setShowSearchModal(true);
  };

  /** Handler for clicking the "Merge into..." button. */
  const handleMergeIntoClick: React.MouseEventHandler<
    HTMLAnchorElement
  > = () => {
    setMergeDirection("into");
    setShowSearchModal(true);
  };

  createMergeButton({
    mergeFromClickHandler: handleMergeFromClick,
    mergeIntoClickHandler: handleMergeIntoClick,
  });

  /* ----------------------------------------- Merge modal ---------------------------------------- */

  const [showMergeModal, setShowMergeModal] = React.useState(false);

  const destinationStudio =
    mergeDirection === "into" ? selectedStudio : thisStudio;

  const sourceStudio = mergeDirection === "from" ? selectedStudio : thisStudio;

  /* ------------------------------------------ Component ----------------------------------------- */

  if (!thisStudio) return null;

  return (
    <>
      <SearchModal
        mergeDirection={mergeDirection}
        selected={selectedStudio}
        setSelected={setSelectedStudio}
        setShow={setShowSearchModal}
        setShowMergeModal={setShowMergeModal}
        show={showSearchModal}
        this={thisStudio}
        type="studio"
      />
    </>
  );
};

interface StudioModalsWrapperProps {
  studioID: Studio["id"];
}

const renderStudioButton = async (path: string) => {
  if (path.match("/studios/\\d+")) {
    // Create a new React root for the modals, as the Studio Details Panel can't
    // be patched directly.

    // Find .detail-container to append the new root element to.
    const elDetailsContainer = await waitForEl(".detail-container");

    // Check if the studio modals root has already rendered to avoid re-rendering.
    const studioRootExists =
      document.querySelector("#" + mergeStudioRootID) !== null;

    if (elDetailsContainer && !studioRootExists) {
      // Create the root for the modals
      const elStudioRoot = document.createElement("div");
      elStudioRoot.setAttribute("id", mergeStudioRootID);

      elDetailsContainer.append(elStudioRoot);

      // Get the studio ID from the URL. E.g. '/studios/1/scenes'
      const studioID = window.location.pathname.split("/")[2];

      // Deprecated in React but still available via the Plugin API at time of
      // development.
      ReactDOM.render(
        <StudioModalsWrapper studioID={studioID} />,
        elStudioRoot
      );
    }
  }
};

// On load
renderStudioButton(window.location.pathname);

// On page change
PluginApi.Event.addEventListener("stash:location", (e) =>
  renderStudioButton(e.detail.data.location.pathname)
);
