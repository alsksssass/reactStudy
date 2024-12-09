const Todo = ({info}) => {
	console.log(info);
	return (<div>
		<input type="checkbox" checked={info.completed} />
		<span>{info && info.title} | {info && info.userId}</span>
	</div>);
}

export default Todo;
