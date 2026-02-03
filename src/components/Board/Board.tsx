import Piece from "$/components/Piece/Piece.tsx";
import Square from "$/components/Square/Square.tsx";
import useBoardState from "$/hooks/useBoardState.ts";
import type { Move, Position } from "$/utils/captures.ts";
import { useEffect } from "react";
import cssClasses from "./Board.module.scss";

export default function Board({ position: { board, whiteToMove }, move, declareSolved }: BoardProps) {
  const [boardState, dispatch] = useBoardState(move);

  useEffect(() => {
    boardState.solved && declareSolved();
  }, [boardState.solved]);

  return (
    <div className={cssClasses.Board} data-current-player={whiteToMove ? "white" : "black"}>
      {board.map((row, y) => (
        <article key={y} className={cssClasses.row}>
          {row.map(({ initial, square }, x) => (
            <Square
              key={`${y}-${x}`}
              rank={y}
              file={x}
              highlighted={boardState.highlightedSquare === square}
              handleClick={() => dispatch({ kind: "square-click", square })}
              handleDragEnter={() => dispatch({ kind: "drag-enter", square })}
              handleDrop={() => dispatch({ kind: "drop", square })}
            >
              {initial && (
                <Piece
                  initial={initial}
                  handleDragStart={() => dispatch({ kind: "drag-start", square })}
                />
              )}
            </Square>
          ))}
        </article>
      ))}
    </div>
  );
}

export type BoardProps = {
  position: Position;
  move: Move;
  declareSolved: VoidFunction;
};