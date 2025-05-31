import cssClasses from "./Piece.module.scss";

const BASE_URL = import.meta.env.BASE_URL;

export default function Piece({ initial, handleDragStart, handleDragEnd, handleDrop }: {
  initial: string;
  handleDragStart: (e: DragEvent) => void;
  handleDragEnd: VoidFunction;
  handleDrop: (e: DragEvent) => void;
}) {
  const src = `${BASE_URL}pieces/${initial}.svg`;

  return (
    <img
      className={cssClasses.Piece}
      src={src}
      alt={initial}
      $init={(element) => element.draggable = true}
      on:dragstart={handleDragStart}
      on:dragend={handleDragEnd}
      on:dragover={handleDragOver}
      on:drop={handleDrop}
    />
  ) as HTMLImageElement;
}

function handleDragOver(e: DragEvent): void {
  e.preventDefault();
}