import Board, { type BoardProps } from "$/components/Board/Board.tsx";
import NotationBar from "$/components/NotationBar/NotationBar.tsx";
import cssClasses from "./BoardFrame.module.scss";

export default function BoardFrame(props: BoardProps) {
  return (
    <article className={cssClasses.BoardFrame}>
      <NotationBar direction="v" />
      <Board {...props} />
      <span></span>
      <NotationBar direction="h" />
    </article>
  );
}