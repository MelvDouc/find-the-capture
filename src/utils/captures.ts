import {
  ChessGame,
  GameResults,
  PawnMove,
  PieceMove,
  Position as ChacoMatPosition,
  type Move
} from "chacomat";

export function getRandomPosition(): Position {
  const { fen, srcIndex, destIndex } = getRandomCapture();
  const position = ChacoMatPosition.fromFEN(fen);

  const board = position.board.toArray().flatMap((row) => {
    return row.map((value) => value?.initial ?? "");
  });

  return {
    board,
    srcIndex,
    destIndex,
    activeColor: position.activeColor.isWhite() ? "blancs" : "noirs"
  };
}

function getRandomCapture(): {
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
    const captures = moves.filter(isCapture);

    if (captures.length === 1) {
      const capture = captures[0] as PieceMove;
      result.push({
        fen: game.currentPosition.toFEN(),
        srcIndex: capture.srcIndex,
        destIndex: capture.destIndex
      });
    }

    game.currentPosition.board.toArray();

    const move = moves[randomIndex(moves.length)];
    game.playMove(move);
  }

  return result[randomIndex(result.length)];
}

function isCapture(move: Move): boolean {
  return (move instanceof PawnMove || move instanceof PieceMove)
    && move.isCapture();
}

function randomIndex(len: number): number {
  return Math.floor(Math.random() * len);
}

export interface Position {
  board: string[];
  srcIndex: number;
  destIndex: number;
  activeColor: "blancs" | "noirs";
}