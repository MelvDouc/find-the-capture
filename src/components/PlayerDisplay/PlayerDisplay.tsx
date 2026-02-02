import type { Obs } from "reactfree-jsx";
import cssClasses from "./PlayerDisplay.module.scss";

export default function PlayerDisplay({ playerObs }: {
  playerObs: Obs<boolean>;
}) {
  const titleObs = playerObs.map((isWhiteToMove) => {
    return isWhiteToMove
      ? "Trait aux blancs"
      : "Trait aux noirs";
  });

  return (
    <div className={cssClasses.PlayerDisplay} title={titleObs}>
      {playerObs.map((isWhiteToMove) => getEmoji(isWhiteToMove))}
    </div>
  );
}

function getEmoji(isWhiteToMove: boolean): string {
  return isWhiteToMove ? "⚪" : "⚫";
}