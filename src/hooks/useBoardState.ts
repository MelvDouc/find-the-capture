import type { Move } from "$/utils/captures.ts";
import { useReducer, useEffect } from "react";

export const NULL_SQUARE = -1;

export default function useBoardState(move: Move) {
  const [state, dispatch] = useReducer(reducer, {
    move,
    srcSquare: NULL_SQUARE,
    highlightedSquare: NULL_SQUARE,
    solved: false
  } as BoardState);

  // Needed otherwise `move` isn't update in the state across re-renders.
  useEffect(() => {
    dispatch({ kind: "set-move", move });
  }, [move]);

  return [state, dispatch] as const;
}

function reducer(prevState: BoardState, action: BoardStateAction): BoardState {
  switch (action.kind) {
    case "set-move":
      return {
        ...prevState,
        move: action.move,
        srcSquare: NULL_SQUARE,
        highlightedSquare: NULL_SQUARE,
        solved: false
      };
    case "square-click":
      return handleSquareClick(prevState, action.square);
    case "drag-start":
      return handleDragStart(prevState, action.square);
    case "drag-enter":
      return handleDragEnter(prevState, action.square);
    case "drop":
      return handleDrop(prevState, action.square);
  }
}

function handleSquareClick(prevState: BoardState, square: number): BoardState {
  if (prevState.srcSquare === NULL_SQUARE)
    return {
      ...prevState,
      highlightedSquare: square,
      srcSquare: square
    };

  if (prevState.srcSquare === square)
    return {
      ...prevState,
      highlightedSquare: NULL_SQUARE,
      srcSquare: NULL_SQUARE
    };

  if (isCorrectMove(prevState, square))
    return {
      ...prevState,
      highlightedSquare: NULL_SQUARE,
      solved: true
    };

  return { ...prevState, highlightedSquare: square, srcSquare: square };
}

function handleDragStart(prevState: BoardState, square: number): BoardState {
  return {
    ...prevState,
    srcSquare: square,
    highlightedSquare: square
  };
}

function handleDragEnter(prevState: BoardState, square: number): BoardState {
  return {
    ...prevState,
    highlightedSquare: square
  };
}

function handleDrop(prevState: BoardState, square: number): BoardState {
  console.log({ drop: prevState });
  return {
    ...prevState,
    srcSquare: NULL_SQUARE,
    highlightedSquare: NULL_SQUARE,
    solved: isCorrectMove(prevState, square)
  };
}

function isCorrectMove({ srcSquare, move }: BoardState, square: number): boolean {
  return srcSquare === move.srcSquare && square === move.destSquare;
}

// ===== ===== ===== ===== =====
// TYPES
// ===== ===== ===== ===== =====

type BoardStateAction =
  | {
    kind: "square-click" | "drag-start" | "drag-enter" | "drop";
    square: number;
  }
  | {
    kind: "set-move";
    move: Move;
  };

export type BoardState = {
  move: Move;
  srcSquare: number;
  highlightedSquare: number;
  solved: boolean;
};