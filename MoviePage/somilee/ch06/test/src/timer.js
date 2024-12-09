import { useState, useEffect } from "react";
function Timer({time, setTime}) {
  useEffect(() => {
    console.log("start");
    const timer = setInterval(() => {
        setTime((prev) => prev + 1);
        console.log(`seconds`);
    }, 1000);
    return () => {
        console.log("end");
        clearInterval(timer);
    };
  }, []);
}
function App() {
  const [showTimer, setShowTimer] = useState(false);
  const [time, setTime] = useState(0);
  const onClick = () => {
    setShowTimer((prev) => !prev);
    setTime(0);
  };

  return (
    <div>
      {showTimer ? <h1>{time}</h1> : <h1>Somin's Timer</h1>}
      {showTimer ? <Timer time={time} setTime={setTime}/> : null}
      <button onClick={onClick}>
        {showTimer ? "Stop Timer" : "Start Timer"}
      </button>
    </div>
  );
}

export default App;