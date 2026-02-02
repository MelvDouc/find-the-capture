import BoardFrame from "$/components/BoardFrame/BoardFrame.tsx";
import PlayerDisplay from "$/components/PlayerDisplay/PlayerDisplay.tsx";
import { getRandomPositionAndMove } from "$/utils/captures.ts";
import { obs, createRef } from "reactfree-jsx";
import cssClasses from "./App.module.scss";

export default function App() {
  let isWhiteToMove = true;
  const gameObs = obs(getRandomPositionAndMove(isWhiteToMove));
  const audioRef = createRef<HTMLAudioElement>();

  const emitSuccess = (): void => {
    audioRef.value?.play();
  };

  return (
    <div className={cssClasses.App} $init={() => gameObs.notify()}>
      <section className={cssClasses.Info}>
        <PlayerDisplay playerObs={gameObs.map(() => isWhiteToMove)} />
      </section>
      <section className={cssClasses.BoardContainer}>
        <BoardFrame gameObs={gameObs} emitSuccess={emitSuccess} />
      </section>
      <audio
        src={import.meta.env.BASE_URL + "audio/success2.wav"}
        $ref={audioRef}
        preload="auto"
        on:ended={() => {
          isWhiteToMove = !isWhiteToMove;
          gameObs.value = getRandomPositionAndMove(isWhiteToMove);
        }}
      ></audio>
    </div>
  ) as HTMLElement;
}