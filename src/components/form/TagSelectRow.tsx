import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;

const TagSelectRow: React.FC<TagSelectRowProps> = (props) => {
  /* --------------------------------------- Load components -------------------------------------- */

  /**
   * ! There is an issue with the PerformerSelect component which is likely
   * happening in the PluginApi. The component only loads if called on an page
   * other than the first. I.e. it doesn't work on a hard refresh or if the
   * performer profile page is navigated to directly. Bug raised at
   * https://github.com/stashapp/stash/issues/5479
   */

  const [componentsReady, setComponentsReady] = React.useState(false);

  // ? Short-term workaround for the above bug. Use a timeout to wait for the
  // PluginApi to fully load before continuing.
  setTimeout(() => setComponentsReady(true), 100);

  if (!componentsReady) return null;

  const { TagSelect } = window.PluginApi.components;

  return (
    <FormRowWrapper label={props.label}>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "destination"}
          performerPosition="destination"
          setSelected={props.setSelectedInput}
        />
        <TagSelect
          className="form-control"
          isDisabled
          isMulti
          values={props.destinationValue}
        />
      </FormInputGroup>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "source"}
          performerPosition="source"
          setSelected={props.setSelectedInput}
        />
        <TagSelect
          className="form-control"
          isMulti
          onSelect={props.setSourceValue}
          values={props.sourceValue}
        />
      </FormInputGroup>
    </FormRowWrapper>
  );
};

export default TagSelectRow;

interface TagSelectRowProps {
  /** The current value for the destination performer. */
  destinationValue: Tag[];

  /** The row label. */
  label: string;

  /** Whether to render the component or not. */
  render?: boolean;

  /** Dictates whether the destination or source value should be used on update. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source value should be used on update. */
  setSelectedInput: React.Dispatch<React.SetStateAction<PerformerPosition>>;

  /** Sets the value of the source input. If not provided, the input is marked
   * as read-only. */
  setSourceValue: (v: Tag[]) => void;

  /** The current value for the source performer. */
  sourceValue: Tag[];
}
