import cssClasses from "./NotationBar.module.scss";

export default function NotationBar({ direction }: {
  direction: "h" | "v";
}) {
  const values = direction === "h" ? RANK_NAMES : FILE_NAMES;

  return (
    <div className={cssClasses.NotationBar} data-direction={direction}>
      {values.map((value) => (
        <span className={cssClasses.NotationBarItem}>{value}</span>
      ))}
    </div>
  );
}

const RANK_NAMES: string[] = Array.from({ length: 8 }, (_, i) => String(i + 1));
const FILE_NAMES: string[] = Array.from({ length: 8 }, (_, i) => String.fromCharCode(65 + i));