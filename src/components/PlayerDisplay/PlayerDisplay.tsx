import type { Obs } from "reactfree-jsx";

export default function PlayerDisplay({ playerObs }: {
  playerObs: Obs<string>;
}) {
  return (
    <p>Trait aux <strong>{playerObs}</strong></p>
  );
}