import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
	const [toDo, setToDo] = useState("");
	const onChange = (event) => setToDo(event.target.value);
	const onSubmit = (event) => {
		event.preventDefault();
		if (toDo === "") {
			return;
		}
	};
	console.log(toDo);
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input onChange={onChange} value={toDo} type="text" placeholder='Write your to do...' />
				<button>Add To Do</button>
			</form>
		</div>
	)
}

export default App
