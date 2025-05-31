import cssClasses from "./NotationBar.module.scss";

export default function NotationBar({ values, direction }: {
  values: string[];
  direction: "h" | "v";
}) {
  return (
    <div className={cssClasses.NotationBar} data-direction={direction}>
      {values.map((value) => (
        <span className={cssClasses.NotationBarItem}>{value}</span>
      ))}
    </div>
  );
}