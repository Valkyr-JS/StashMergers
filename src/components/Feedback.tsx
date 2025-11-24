import React from "react";

const Feedback: React.FC<FeedbackProps> = (props) => {
  if (!props.show) return null;

  const classes =
    props.type === "warning"
      ? "invalid-feedback text-warning"
      : "invalid-feedback";

  return <div className={classes}>{props.children}</div>;
};

interface FeedbackProps extends React.PropsWithChildren {
  /** Whether to display the feedback. */
  show: boolean;

  /** The type of feedback being given. */
  type: "error" | "warning";
}

export default Feedback;
