import cssClasses from "./Piece.module.scss";

const BASE_URL = import.meta.env.BASE_URL;

export default function Piece({ initial }: {
  initial: string;
}) {
  return (
    <img
      className={cssClasses.Piece}
      src={`${BASE_URL}pieces/${initial}.svg`}
      alt={initial}
    />
  );
}