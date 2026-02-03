import { getRandomPositionAndMove, type Move, type Position } from "$/utils/captures.ts";
import { fileOf, rankOf } from "$/utils/coords.ts";
import { useReducer } from "react";

export default function useGameState() {
  const [position, move] = getRandomPositionAndMove(true);
  return useReducer(reducer, {
    position,
    move,
    solved: false
  });
}

function reducer(state: GameState, action: GameStateAction): GameState {
  switch (action.kind) {
    case GameStateActionKinds.DeclareSolved: {
      return {
        ...state,
        position: {
          ...state.position,
          board: playMove(state.position.board, state.move)
        },
        solved: true
      };
    }
    case GameStateActionKinds.GenNext: {
      const { whiteToMove } = state.position;
      const [position, move] = getRandomPositionAndMove(!whiteToMove);
      return {
        position,
        move,
        solved: false
      };
    }
  }
}

function playMove(board: Position["board"], { srcSquare: srcIndex, destSquare: destIndex }: Move): Position["board"] {
  const srcValue = board[rankOf(srcIndex)][fileOf(srcIndex)];

  return board.map((row) => {
    return row.map((value) => {
      if (value.square === srcIndex)
        return { ...value, initial: "" };

      if (value.square === destIndex)
        return { ...srcValue };

      return value;
    });
  });
}

export const GameStateActionKinds = {
  DeclareSolved: 0,
  GenNext: 1
} as const;

type DeclareSolvedGameStateAction = {
  kind: typeof GameStateActionKinds["DeclareSolved"];
};

type GenNextGameStateAction = {
  kind: typeof GameStateActionKinds["GenNext"];
};

type GameStateAction = DeclareSolvedGameStateAction | GenNextGameStateAction;

type GameState = {
  position: Position;
  move: Move;
  solved: boolean;
};