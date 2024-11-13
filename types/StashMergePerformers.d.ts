/** Types for your plugin config. Settings are undefined by default. Data should
 * match the settings in your `/src/source.yml` file. */
interface MyPluginConfig {}

/** The direction of the performer merge:
 * * `"from"`: The current performer is the target
 * * `"into"`: The current performer is the source
 */
type MergeDirection = "from" | "into";
