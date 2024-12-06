const root = document.getElementById("root");

const Converter = ({info}) => {
	const [amount, setAmount] = React.useState(0);
	const [flipped, setFlipped] = React.useState(false);
	const onChange = (e) => {
		setAmount(e.target.value);
	};
	const reset = () => {
		setAmount(0);
	};
	const onFlip = () => {
		setFlipped((cur) => !cur);
		setAmount((cur) => flipped ? info.toFrom(cur) : info.fromTo(cur));
	};
	return (<div>
		<h3>{info.from} & {info.to}</h3>
		<div>
			<label htmlFor={info.from}>{info.from}</label>
			<input id={info.from} placeholder={info.from} type="number" onChange={onChange} value={flipped ? info.toFrom(amount) : amount} disabled={flipped}/>
		</div>
		<div>
			<label htmlFor={info.to}>{info.to}</label>
			<input id={info.to} placeholder={info.to} type="number" onChange={onChange} value={flipped ? amount : info.fromTo(amount)} disabled={!flipped}/>
		</div>
		<button onClick={reset}>reset</button>
		<button onClick={onFlip}>{flipped ? `${info.to} => ${info.from}` : `${info.from} => ${info.to}`}</button>
	</div>);
};

const App = () => {
	const [index, setIndex] = React.useState("0");
	const onSelect = (e) => {
		setIndex(e.target.value);
		console.log(e.target.value);
	};
	const arr = [
		{from: 'minute', to: 'hour', fromTo: (v) => v/60, toFrom: (v) => v*60},
		{from: 'km', to: 'miles', fromTo: (v) => v/1.609, toFrom: (v) => v*1.609}
	];
	return (
		<div>
			<h1>Converter</h1>
			<select onChange={onSelect}>
				{arr.map((v, i) => <option value={i}>{v.from} & {v.to}</option>)}
			</select>
			<hr />
			{index ? <Converter info={arr[parseInt(index)]} /> : null}
		</div>
	);
};

ReactDOM.render(<App/>, root);