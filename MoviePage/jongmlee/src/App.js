import Button from "./Button";
import styles from "./App.module.css"
import { useState, useEffect } from "react";

function App() {
	const [counter, setValue] = useState(0);
	const [keyword, setKeyword] = useState("");
	const onClick = () => setValue((prev) => prev + 1);
	const onChange = (event) => setKeyword(event.target.value);
	console.log("i run all the time");
	useEffect(() => {
		console.log("i run only on ce.");
	}, []);
	useEffect(() => {
		if (keyword !== "" && keyword.length > 5) {
			console.log("SEARCH FOR ", keyword);
		}
	}, [keyword]);
  return (
	<div>
		<input value={keyword} onChange={onChange} type="text" placeholder="search here..." />
		<h1>{counter}</h1>
		<button onClick={onClick}>click me</button>
	</div>
  );
}

export default App;
