import { useEffect, useState } from "react";

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(6);
  const [timerOn, setTimerOn] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = displayMessage ? 24 : 4;
            let seconds = 59;

            setMinutes(minutes);
            setSeconds(seconds);
            setDisplayMessage(!displayMessage);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerOn, seconds]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-2xl">
      <div>{displayMessage && <div>Time for a break!</div>}</div>
      <div className="Timer">
        {timerMinutes}:{timerSeconds}
      </div>
      <div>
        <button
          onClick={() => setTimerOn(true)}
          className="m-3 p-0.5 rounded bg-green-500 text-white"
        >
          Start
        </button>
        <button
          onClick={() => setTimerOn(false)}
          className="p-0.5 rounded bg-green-500 text-white "
        >
          Stop
        </button>
      </div>
    </div>
  );
}
