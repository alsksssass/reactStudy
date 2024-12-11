import { useState } from 'react'

function App() {
	const [toDo, setToDo] = useState("");
	const [toDos, setToDos] = useState([]);
	const onChange = (event) => setToDo(event.target.value);
	const onSubmit = (event) => {
		event.preventDefault();
		if (toDo === "")
			return;
		setToDos(currentArray => [toDo, ...currentArray]); //array push 대신 쓰는 문법 인듯
		setToDo("");
	}
	console.log(toDos);
	return (
		<>
		<h1>My To Dos ({toDo.length})</h1>
			<form onSubmit={onSubmit}>
				<input
					onChange={onChange}
					value={toDo}
					type="text"
					placeholder="Write your to do...">
				</input>
				<button>Add To Do</button>
			</form>
			<hr/>
			<ul>
				{toDos.map((item, index) => <li key={index}>{item}</li>)}
			</ul>
		</>
	)
}

export default App
