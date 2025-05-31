import {
  ChessGame,
  GameResults,
  PawnMove,
  PieceMove,
  Position as ChacoMatPosition,
  type Move as ChacoMatMove
} from "chacomat";

export function getRandomPositionAndMove(isWhiteToMove: boolean): [Position, Move] {
  const { fen, srcIndex, destIndex } = getRandomCapture(isWhiteToMove);
  const position = ChacoMatPosition.fromFEN(fen);

  const board = position.board.toArray().flatMap((row) => {
    return row.map((value) => value?.initial ?? "");
  });

  const move = {
    srcIndex,
    destIndex,
  };
  const pos = {
    board,
    isWhiteToMove: position.activeColor.isWhite()
  };

  return [pos, move];
}

function getRandomCapture(isWhiteToMove: boolean): {
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

    if (game.currentPosition.activeColor.isWhite() === isWhiteToMove) {
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
    return getRandomCapture(isWhiteToMove);

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
  srcIndex: number;
  destIndex: number;
};

export interface Position {
  board: string[];
  isWhiteToMove: boolean;
}