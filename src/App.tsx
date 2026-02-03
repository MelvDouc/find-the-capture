import BoardFrame from "$/components/BoardFrame/BoardFrame.tsx";
import PlayerDisplay from "$/components/PlayerDisplay/PlayerDisplay.tsx";
import useGameState, { GameStateActionKinds as ActionKinds } from "$/hooks/useGameState.ts";
import { useEffect, useRef } from "react";
import cssClasses from "./App.module.scss";

export default function App() {
  const [{ position, move, solved }, dispatch] = useGameState();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (solved && audioRef.current)
      audioRef.current.play().then(() => { });
  }, [solved]);

  return (
    <div className={cssClasses.App}>
      <section className={cssClasses.Info}>
        <PlayerDisplay whiteToMove={position.whiteToMove} />
      </section>
      <section className={cssClasses.BoardContainer}>
        <BoardFrame
          position={position}
          move={move}
          declareSolved={() => dispatch({ kind: ActionKinds.DeclareSolved })}
        />
      </section>
      <audio
        src={import.meta.env.BASE_URL + "audio/success2.wav"}
        preload="auto"
        ref={audioRef}
        onEnded={() => dispatch({ kind: ActionKinds.GenNext })}
      ></audio>
    </div>
  );
}