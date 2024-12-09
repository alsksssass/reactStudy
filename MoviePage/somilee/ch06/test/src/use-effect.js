import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  console.log("i rin all the time");
  useEffect(() => {
    console.log("CALL THE API");
  }, []); //한번만 실행
  useEffect(() => {
    if (keyword != "" && keyword.length > 5) {
      console.log("i run when keyword changes");
    }
  }, [keyword]); //keyword 변화시에만 실행
  useEffect(() => {
    console.log("i run when counter & keyword changes");
  }, [counter, keyword]); // counter 또는 keyword 변화시 실행
  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default App;
