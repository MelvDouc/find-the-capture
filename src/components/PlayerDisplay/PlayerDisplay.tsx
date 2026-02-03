import cssClasses from "./PlayerDisplay.module.scss";

export default function PlayerDisplay({ whiteToMove }: { whiteToMove: boolean; }) {
  const title = whiteToMove ? "Trait aux blancs" : "Trait aux noirs";

  return (
    <div className={cssClasses.PlayerDisplay} title={title}>
      {whiteToMove ? "⚪" : "⚫"}
    </div>
  );
}