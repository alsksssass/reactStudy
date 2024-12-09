import Button from "./Button";
import {useState, useEffect} from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const onClick = () => setCounter((prev) => prev + 1);
  console.log("i run all the time");
  // const iRunOnlyOnce = () => {
  //   console.log("i run only once");
  // }
  // useEffect(iRunOnlyOnce, []);
  useEffect(() => {
    console.log("i run only once");
  }, []);
  return (
    <div>
      <h1>Welcome back!</h1>
      <h3>{counter}</h3>
      <button onClick={onClick}>button</button>
      <Button text={"continue"}/>
    </div>
  );
}

export default App;
