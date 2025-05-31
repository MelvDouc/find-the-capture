import cssClasses from "./Square.module.scss";

export default function Square({ rank, file }: {
  rank: number;
  file: number;
}) {
  const className = {
    [cssClasses.Square]: true,
    [cssClasses.dark]: rank % 2 === file % 2
  };
  return (
    <div
      className={className}
      $init={(element) => {
        element.draggable = true;
      }}
    ></div>
  );
}