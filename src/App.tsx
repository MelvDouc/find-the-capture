import BoardFrame from "$/components/BoardFrame/BoardFrame.tsx";
import PlayerDisplay from "$/components/PlayerDisplay/PlayerDisplay.js";
import { getRandomPositionAndMove } from "$/utils/captures.js";
import { obs } from "reactfree-jsx";
import cssClasses from "./App.module.scss";

export default function App() {
  let isWhiteToMove = true;
  const gameObs = obs(getRandomPositionAndMove(isWhiteToMove));

  const audio = (
    <audio src={import.meta.env.BASE_URL + "audio/success2.wav"} preload="auto"></audio>
  ) as HTMLAudioElement;

  audio.addEventListener("ended", () => {
    isWhiteToMove = !isWhiteToMove;
    gameObs.value = getRandomPositionAndMove(isWhiteToMove);
  });

  const emitSuccess = (): void => {
    audio.play();
  };

  return (
    <div className={cssClasses.App} $init={() => gameObs.notify()}>
      <section className={cssClasses.Info}>
        <PlayerDisplay playerObs={gameObs.map(() => isWhiteToMove)} />
      </section>
      <section className={cssClasses.BoardContainer}>
        <BoardFrame gameObs={gameObs} emitSuccess={emitSuccess} />
      </section>
      {audio}
    </div>
  ) as HTMLElement;
}