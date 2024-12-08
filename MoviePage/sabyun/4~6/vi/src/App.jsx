import { useState, useEffect} from "react";
import { Button } from "./Button";

function App() {
  const [counter , setcounter] = useState(0);
  const [key, setkey] = useState("");
  const [state,setstate] = useState(true);
  const oncliked = ()=> {
    setcounter((pre)=> pre +1);
  }
  useEffect(()=> setkey("입력값 입력해주세요"),[]);
  const onchanged = (evnet) => {
    setkey(evnet.target.value);
  }
  const showUp= ()=> setstate(!state);
  useEffect(()=>{
    console.log('changed value');
  }, [key]);
  return (
    <div className="App">
      <h1>well come back!</h1>
      <input value={key} onChange={onchanged}></input>
      {state ? <h1>{key}</h1> : null}
      <h1>{counter}</h1>
      <Button fn={oncliked} txt={"continue!"} />
      <Button fn={showUp} txt={state ? "show": "hide"} />
    </div>
  );
}

export default App;
