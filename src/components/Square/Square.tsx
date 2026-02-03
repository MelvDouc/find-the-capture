import classNames from "classnames";
import type { ReactNode } from "react";
import cssClasses from "./Square.module.scss";

export default function Square({ rank, file, highlighted, handleClick, children }: {
  rank: number;
  file: number;
  highlighted: boolean;
  handleClick: VoidFunction;
  children?: ReactNode;
}) {
  const className = classNames({
    [cssClasses.Square]: true,
    [cssClasses.dark]: rank % 2 === file % 2,
    [cssClasses.highlighted]: highlighted
  });

  return (
    <div className={className} onClick={handleClick}>{children}</div>
  );
}