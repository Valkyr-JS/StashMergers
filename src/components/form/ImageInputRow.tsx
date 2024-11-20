import FormInputGroup from "./FormInputGroup";
import FormRowWrapper from "./FormRowWrapper";
import SelectInputButton from "./SelectInputButton";

const { PluginApi } = window;
const { React } = PluginApi;

const ImageRow: React.FC<ImageRowProps> = (props) => {
  if (props.render === false) return null;

  return (
    <FormRowWrapper label={props.label}>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "destination"}
          performerPosition="destination"
          setSelected={props.setSelectedInput}
        />
        <img className="performer-image" {...props.destinationImage} />
      </FormInputGroup>
      <FormInputGroup>
        <SelectInputButton
          selected={props.selectedInput === "source"}
          performerPosition="source"
          setSelected={props.setSelectedInput}
        />
        <img className="performer-image" {...props.sourceImage} />
      </FormInputGroup>
    </FormRowWrapper>
  );
};

export default ImageRow;

interface ImageRowProps {
  /** The image for the destination performer. */
  destinationImage: IImageProp;

  /** The row label. */
  label: string;

  /** Whether to render the component or not. */
  render?: boolean;

  /** Dictates whether the destination or source value should be used on update. */
  selectedInput: PerformerPosition;

  /** Sets whether the destination or source value should be used on update. */
  setSelectedInput: React.Dispatch<React.SetStateAction<PerformerPosition>>;

  /** The image for the source performer. */
  sourceImage: IImageProp;
}
