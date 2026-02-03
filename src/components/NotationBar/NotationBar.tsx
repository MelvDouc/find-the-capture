import { COORD_NAMES } from "$/utils/coords.ts";
import classNames from "classnames";
import cssClasses from "./NotationBar.module.scss";

export default function NotationBar(props: NotationBarProps) {
  const className = classNames({
    [cssClasses.NotationBar]: true,
    [cssClasses.reversed]: props.reversed
  });

  return (
    <div className={className} data-direction={props.direction}>
      {COORD_NAMES[props.direction].map((value) => (
        <span key={value} className={cssClasses.NotationBarItem}>{value}</span>
      ))}
    </div>
  );
}

type NotationBarProps = {
  direction: "h" | "v";
  reversed: boolean;
};