import { useEffect, useState } from "react";
import Todo from "./Todo";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const test = [1, 2, 3];
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then(response => response.json())
			.then(json => {
				console.log(json[0]);
				const t = [...json];
				setTodos(t);
			});
		return () => console.log('destroy');
	}, []);
	return (<div>
		<h1>[Todo list]</h1>
		{todos.length !== 0 ? todos.map(todo => <Todo info={todo} />) : null}
	</div>);
}

export default TodoList;
