import {
  Position as ChacoMatPosition,
  ChessGame,
  GameResults,
  PawnMove,
  PieceMove,
  type Move as ChacoMatMove
} from "chacomat";

export function getRandomPositionAndMove(whiteToMove: boolean): [Position, Move] {
  const { fen, srcIndex, destIndex } = getRandomCapture(whiteToMove);
  const position = ChacoMatPosition.fromFEN(fen);

  const board = position.board.toArray().map((row, rank) => {
    return row.map((value, file) => {
      const square = rank * 8 + file;
      return { initial: value?.initial ?? "", square };
    });
  });

  return [
    {
      board,
      whiteToMove: position.activeColor.isWhite()
    },
    {
      srcSquare: srcIndex,
      destSquare: destIndex
    }
  ];
}

function getRandomCapture(whiteToMove: boolean): {
  fen: string;
  srcIndex: number;
  destIndex: number;
} {
  const game = new ChessGame();
  const result: {
    fen: string;
    srcIndex: number;
    destIndex: number;
  }[] = [];

  while (game.currentResult === GameResults.NONE) {
    const moves = game.currentPosition.legalMoves;

    if (game.currentPosition.activeColor.isWhite() === whiteToMove) {
      const captures = moves.filter(isCapture);

      if (captures.length === 1) {
        const capture = captures[0] as PieceMove;
        result.push({
          fen: game.currentPosition.toFEN(),
          srcIndex: capture.srcIndex,
          destIndex: capture.destIndex
        });
      }
    }

    const move = moves[randomIndex(moves.length)];
    game.playMove(move);
  }

  if (result.length === 0)
    return getRandomCapture(whiteToMove);

  return result[randomIndex(result.length)];
}

function isCapture(move: ChacoMatMove): boolean {
  return (move instanceof PawnMove || move instanceof PieceMove)
    && move.isCapture();
}

function randomIndex(len: number): number {
  return Math.floor(Math.random() * len);
}

export type Move = {
  srcSquare: number;
  destSquare: number;
};

export type Position = {
  board: {
    initial: string;
    square: number;
  }[][];
  whiteToMove: boolean;
};