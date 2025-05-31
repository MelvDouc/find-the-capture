import { obs } from "reactfree-jsx";
import ChessBoard from "$/components/ChessBoard/ChessBoard.tsx";
import { getRandomPosition } from "$/utils/captures.ts";
import cssClasses from "./App.module.scss";
import PlayerDisplay from "$/components/PlayerDisplay/PlayerDisplay.tsx";

export default function App() {
  const positionObs = obs(getRandomPosition());

  return (
    <div
      className={cssClasses.App}
      $init={() => {
        positionObs.notify();
      }}
    >
      <section className={cssClasses.Info}>
        <PlayerDisplay playerObs={positionObs.map(({ activeColor }) => activeColor)} />
      </section>
      <section className={cssClasses.BoardContainer}>
        <ChessBoard positionObs={positionObs} />
      </section>
    </div>
  );
}