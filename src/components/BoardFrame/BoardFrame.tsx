import Board from "$/components/Board/Board.tsx";
import type { Move, Position } from "$/utils/captures.js";
import { type Obs } from "reactfree-jsx";
import cssClasses from "./BoardFrame.module.scss";
import NotationBar from "$/components/NotationBar/NotationBar.tsx";

export default function BoardFrame({ gameObs, emitSuccess }: {
  gameObs: Obs<[Position, Move]>;
  emitSuccess: VoidFunction;
}) {
  return (
    <article className={cssClasses.BoardFrame}>
      <NotationBar direction="v" />
      <Board gameObs={gameObs} emitSuccess={emitSuccess} />
      <span></span>
      <NotationBar direction="h" />
    </article>
  );
}
