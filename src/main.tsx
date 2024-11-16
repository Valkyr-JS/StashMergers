import MergeDropdownButton from "./components/MergeDropdownButton";
import MergeModal from "./components/MergeModal";
import SearchModal from "./components/SearchModal";
import { mergeButtonRootID } from "./constants";
import "./styles.scss";

const { PluginApi } = window;
const { React, ReactDOM } = PluginApi;

// Wait for the performer details panel to load, as this contains the
PluginApi.patch.instead("PerformerDetailsPanel", function (props, _, Original) {
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
    mergeDirection === "into" ? selectedPerformer : props.performer;

  const sourcePerformer =
    mergeDirection === "from" ? selectedPerformer : props.performer;

  /* ------------------------------------ Merge dropdown button ----------------------------------- */

  // Find .details-edit which contains the editing buttons under the performer
  // details.
  const elDetailsEdit = document.querySelector(".details-edit");
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
    ReactDOM.render(
      <MergeDropdownButton
        mergeFromClickHandler={handleMergeFromClick}
        mergeIntoClickHandler={handleMergeIntoClick}
      />,
      elButtonRoot
    );
  }

  /* ------------------------------------------ Component ----------------------------------------- */

  return [
    <>
      <Original {...props} />
      <SearchModal
        mergeDirection={mergeDirection}
        selectedPerformer={selectedPerformer}
        setSelectedPerformer={setSelectedPerformer}
        setShow={setShowSearchModal}
        setShowMergeModal={setShowMergeModal}
        show={showSearchModal}
      />
      <MergeModal
        destinationPerformer={destinationPerformer}
        mergeDirection={mergeDirection}
        setShow={setShowMergeModal}
        show={showMergeModal}
        sourcePerformer={sourcePerformer}
      />
    </>,
  ];
});
