import Board, { type BoardProps } from "$/components/Board/Board.tsx";
import NotationBar from "$/components/NotationBar/NotationBar.tsx";
import cssClasses from "./BoardFrame.module.scss";

export default function BoardFrame(props: BoardProps) {
  const { whiteToMove } = props.position;

  return (
    <article className={cssClasses.BoardFrame}>
      <NotationBar direction="v" reversed={whiteToMove} />
      <Board {...props} />
      <span></span>
      <NotationBar direction="h" reversed={!whiteToMove} />
    </article>
  );
}