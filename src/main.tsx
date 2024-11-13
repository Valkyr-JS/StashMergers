const { PluginApi } = window;
const { React } = PluginApi;

// Replace the performer details panel at the top of the performer page with one
// that has yellow text and an additional component.
PluginApi.patch.instead(
  "PerformerDetailsPanel.DetailGroup",
  function (props, _, Original) {
    console.log("props:", props);
    console.log("Original:", Original);
    console.log("<Original>:", <Original {...props} />);

    // Return the component
    return [<Original {...props} />];
  }
);
