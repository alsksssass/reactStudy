// import styles from "./App.module.css"
import { useState, useEffect } from "react"

function Plus() {
	return <span>+</span>;
}

function Minus() {
	return <span>-</span>;
}

function Dot() {
	return <span>.</span>;
}

function Result({first, second, sign}) {
	useEffect(() => {
		return () => {
			console.log("reset");
		}
	}, [])
	let result = 0;
	if (sign === "+")
		result = first + second;
	else if (sign === "-")
		result = first - second
	else
		return <h1>input sign</h1>
	return <h1>{result}</h1>
}

function App() {
	const [counter1, setCounter1] = useState(0);
	const [counter2, setCounter2] = useState(0);
	const [resultBool, setResultBool] = useState(true);
	const [keyword, setKeyword] = useState("");
	const [holderText, setHolderText] = useState("only + or -");

	const upCnt1 = () => setCounter1((prev) => prev + 1);
	const upCnt2 = () => setCounter2((prev) => prev + 1);
	const flipResult = () => setResultBool((prev) => !prev);
	const onChange = (event) => {
		setKeyword(event.target.value);
		if (keyword === "+")
			setHolderText("now +");
		else if (keyword === "-")
			setHolderText("now -");
		else
			setHolderText("only + or -");
	}
	useEffect(() => {
		if (resultBool === true)
		{
			setCounter1(0);
			setCounter2(0);
			setKeyword("");
			setHolderText("only + or -");
		}
	}, [resultBool])

	return (
		<>
			<div>
				<input
					value={keyword}
					onChange={onChange}
					type="text"
					placeholder={holderText}
				/>
				<div>
					<h1>
						{counter1}
						{keyword === "+" ? <Plus /> : null}
						{keyword === "-" ? <Minus /> : null}
						{keyword !== "+" && keyword !== "-" ? <Dot /> : null}
						{counter2}
					</h1>
				</div>
				<button onClick={upCnt1}>up first</button>
				<span>   </span>
				<button onClick={upCnt2}>up second</button>
			</div>
			<div>
				<button onClick={flipResult}>{resultBool ? "result" : "reset"}</button>
				<h1>{!resultBool ? <Result first={counter1} second={counter2} sign={keyword}/> : null}</h1>
			</div>
		</>
	)
}

export default App
