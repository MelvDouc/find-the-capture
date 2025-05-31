import type { Obs } from "reactfree-jsx";
import Square from "$/components/Square/Square.tsx";
import NotationBar from "$/components/NotationBar/NotationBar.tsx";
import type { Position } from "$/utils/captures.ts";

import cssClasses from "./ChessBoard.module.scss";

export default function ChessBoard({ positionObs }: {
  positionObs: Obs<Position>;
}) {
  const squares = Array.from({ length: 64 }, (_, index) => {
    const rank = Math.floor(index / 8);
    const file = index % 8;

    return (
      <Square rank={rank} file={file} />
    ) as HTMLElement;
  });

  positionObs.subscribe(({ board: initials }) => {
    initials.forEach((initial, index) => {
      squares[index].dataset.piece = initial;
    });
  });

  return (
    <div
      className={cssClasses.ChessBoard}
      $init={(element) => {
        for (let rank = 8 - 1; rank >= 0; rank--)
          for (let file = 0; file < 8; file++)
            element.append(squares[rank * 8 + file]);
      }}
    >
      <NotationBar direction="v" values={RANK_NAMES} />
      <NotationBar direction="h" values={FILE_NAMES} />
    </div>
  );
}

const RANK_NAMES: string[] = Array.from({ length: 8 }, (_, i) => String(i + 1));
const FILE_NAMES: string[] = Array.from({ length: 8 }, (_, i) => String.fromCharCode(65 + i));