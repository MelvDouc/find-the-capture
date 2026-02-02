import { COORD_NAMES } from "$/utils/coords.ts";
import cssClasses from "./NotationBar.module.scss";

export default function NotationBar({ direction }: {
  direction: "h" | "v";
}) {
  return (
    <div className={cssClasses.NotationBar} data-direction={direction}>
      {COORD_NAMES[direction].map((value) => (
        <span className={cssClasses.NotationBarItem}>{value}</span>
      ))}
    </div>
  );
}