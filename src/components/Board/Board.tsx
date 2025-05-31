import { type Obs } from "reactfree-jsx";

import Square from "$/components/Square/Square.js";
import NotationBar from "$/components/NotationBar/NotationBar.js";
import Piece from "$/components/Piece/Piece.tsx";
import type { Move, Position } from "$/utils/captures.js";

import cssClasses from "./Board.module.scss";

export default function Board({ gameObs, emitSuccess }: {
  gameObs: Obs<[Position, Move]>;
  emitSuccess: VoidFunction;
}) {
  let highlightedSquare: HTMLElement | null = null;

  const setHighlighted = (square: HTMLElement) => {
    highlightedSquare = square;
  };

  const clearHighlightedSquare = (): void => {
    if (highlightedSquare) {
      highlightedSquare.dataset.highlighted = "0";
      highlightedSquare = null;
    }
  };

  const squares = Array.from({ length: 64 }, (_, index) => {
    const rank = Math.floor(index / 8);
    const file = index % 8;


    return (
      <Square rank={rank} file={file} setHighlighted={setHighlighted} />
    ) as HTMLElement;
  });

  gameObs.subscribe(([pos, move]) => {
    clearHighlightedSquare();

    pos.board.forEach((initial, imageIndex) => {
      const square = squares[imageIndex];

      if (!initial) {
        square.replaceChildren();
        return;
      }

      const clearSrcSquare = () => squares[move.srcIndex].replaceChildren();

      square.replaceChildren(
        <Piece
          initial={initial}
          handleDragStart={createDragStartHandler(imageIndex)}
          handleDragEnd={clearHighlightedSquare}
          handleDrop={createDropHandler(emitSuccess, clearSrcSquare, imageIndex, move)}
        /> as HTMLElement
      );
    });
  });

  return (
    <div
      className={cssClasses.Board}
      $init={(element) => {
        for (let rank = 8 - 1; rank >= 0; rank--)
          for (let file = 0; file < 8; file++)
            element.append(squares[rank * 8 + file]);
      }}
    >
      <NotationBar direction="v" />
      <NotationBar direction="h" />
    </div>
  );
}

function createDragStartHandler(imageIndex: number) {
  return (e: DragEvent) => {
    const image = e.target as HTMLImageElement;
    e.dataTransfer?.setData("text/plain", String(imageIndex));
    e.dataTransfer?.setData("text/html", image.outerHTML);
    e.dataTransfer?.setDragImage(image, image.width / 2, image.height / 2);
  };
}

function createDropHandler(
  emitSuccess: VoidFunction,
  clearSrcSquare: VoidFunction,
  imageIndex: number,
  { srcIndex, destIndex }: Move,
) {
  return (e: DragEvent): void => {
    e.preventDefault();
    const draggedIndex = Number(e.dataTransfer?.getData("text/plain"));

    if (draggedIndex === srcIndex && imageIndex === destIndex) {
      const imageHtml = e.dataTransfer?.getData("text/html") as string;
      clearSrcSquare();
      (e.target as HTMLElement).outerHTML = imageHtml;
      emitSuccess();
    }
  };
}