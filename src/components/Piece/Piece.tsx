import cssClasses from "./Piece.module.scss";

const BASE_URL = import.meta.env.BASE_URL;

export default function Piece({ initial, handleDragStart }: PieceProps) {
  return (
    <img
      className={cssClasses.Piece}
      src={`${BASE_URL}pieces/${initial}.svg`}
      alt={initial}
      onDragStart={(e) => {
        const img = e.currentTarget;
        e.dataTransfer.setDragImage(img, img.width / 2, img.height / 2);
        handleDragStart();
      }}
    />
  );
}

type PieceProps = {
  initial: string;
  handleDragStart: VoidFunction;
};