import MergeDropdownButton from "./components/MergeDropdownButton";
import "./styles.scss";

const { PluginApi } = window;
const { React, ReactDOM } = PluginApi;

// Replace the performer details panel at the top of the performer page with one
// that has yellow text and an additional component.
PluginApi.patch.instead(
  //@ts-ignore
  "PerformerDetailsPanel",
  //@ts-ignore
  function (props, _, Original) {
    // Find .details-edit which contains the editing buttons under the performer
    // details.
    const elDetailsEdit = document.querySelector(".details-edit");
    const elDeleteButton = elDetailsEdit?.querySelector("button.delete");

    if (elDetailsEdit) {
      // Create the root for React
      const elButtonRoot = document.createElement("div");
      elButtonRoot.setAttribute("id", "stash-merge-performers-btn-root");

      // If the delete button has been found, set the button root before it.
      // Otherwise, add it to the end of the .details-edit container.
      elDeleteButton
        ? elDeleteButton.before(elButtonRoot)
        : elDetailsEdit.append(elButtonRoot);

      // Deprecated in React but still available via the Plugin API at time of
      // development.
      ReactDOM.render(<MergeDropdownButton />, elButtonRoot);
    }

    // Create the Merge button in JS. There's little point in adding React here
    // for this.
    const elMergeButton = document.createElement("button");
    elMergeButton;

    // Return the component
    return [<Original {...props} />];
  }
);
