import classNames from "classnames";
import type React from "react";
import cssClasses from "./Square.module.scss";

export default function Square(props: {
  rank: number;
  file: number;
  highlighted: boolean;
  handleClick: VoidFunction;
  handleDragEnter: VoidFunction;
  handleDrop: VoidFunction;
  children?: React.ReactNode;
}) {
  const className = classNames({
    [cssClasses.Square]: true,
    [cssClasses.dark]: props.rank % 2 === props.file % 2,
  });

  return (
    <div
      className={className}
      data-highlighted={props.highlighted ? "1" : "0"}
      onClick={props.handleClick}
      onDragEnter={props.handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={(e) => {
        e.preventDefault();
        props.handleDrop();
      }}
    >{props.children}</div>
  );
}

/**
 * Required for the drop event to fire.
 */
function handleDragOver(e: React.DragEvent) {
  e.preventDefault();
}