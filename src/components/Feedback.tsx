import classNames from "classnames";
import React from "react";

const Feedback: React.FC<FeedbackProps> = (props) => {
  if (!props.show) return null;

  const classes = classNames("invalid-feedback", {
    "text-warning": props.type === "warning",
  });

  return <div className={classes}>{props.children}</div>;
};

interface FeedbackProps extends React.PropsWithChildren {
  /** Whether to display the feedback. */
  show: boolean;

  /** The type of feedback being given. */
  type: "error" | "warning";
}

export default Feedback;
