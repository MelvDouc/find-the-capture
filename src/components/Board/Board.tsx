import Piece from "$/components/Piece/Piece.tsx";
import Square from "$/components/Square/Square.tsx";
import type { Move, Position } from "$/utils/captures.ts";
import classNames from "classnames";
import { useState } from "react";
import cssClasses from "./Board.module.scss";

export default function Board({ position, move, declareSolved }: BoardProps) {
  const [highlightedSquare, setHighlightedSquare] = useState(-1);
  const { board, whiteToMove } = position;

  const boardClassName = classNames({
    [cssClasses.Board]: true,
    [cssClasses.reversed]: whiteToMove
  });

  const rowClassName = classNames({
    [cssClasses.row]: true,
    [cssClasses.reversed]: !whiteToMove
  });

  return (
    <div className={boardClassName}>
      {board.map((row, y) => (
        <article key={y} className={rowClassName}>
          {row.map(({ initial, square }, x) => (
            <Square
              key={`${y}-${x}`}
              rank={y}
              file={x}
              highlighted={highlightedSquare === square}
              handleClick={() => {
                handleSquareClick({
                  move,
                  declareSolved,
                  highlightedSquare,
                  setHighlightedSquare,
                  currentSquare: square
                });
              }}
            >
              {initial && (<Piece initial={initial} />)}
            </Square>
          ))}
        </article>
      ))}
    </div>
  );
}

function handleSquareClick({
  move,
  declareSolved,
  highlightedSquare,
  setHighlightedSquare,
  currentSquare
}: SquareClickHandlerProps): void {
  if (highlightedSquare === -1) {
    setHighlightedSquare(currentSquare);
    return;
  }

  if (highlightedSquare === currentSquare) {
    setHighlightedSquare(-1);
    return;
  }

  if (highlightedSquare === move.srcSquare && currentSquare === move.destSquare) {
    setHighlightedSquare(-1);
    declareSolved();
    return;
  }
}

export type BoardProps = {
  position: Position;
  move: Move;
  declareSolved: VoidFunction;
};

type SquareClickHandlerProps = {
  move: Move;
  declareSolved: VoidFunction;
  highlightedSquare: number;
  setHighlightedSquare: (value: number) => void;
  currentSquare: number;
};