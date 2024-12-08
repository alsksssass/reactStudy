class Converter extends React.Component{
	constructor(prop){
		super(prop);
		const [to , from] = prop.base;
		const [convert_to, convert_from] = prop.convert;
		this.state  = {
			amount :0,
			flip: false,
			to,
			from,
			convert_to,
			convert_from,
		};
		this.onChangValue =  this.onChangValue.bind(this);
		this.flipbtn =  this.flipbtn.bind(this);

	}
	onChangValue(event){
		console.log("event id = ", event.target.id);
		console.log("to = ", this.state.to);
		const value = event.target.id === this.state.to ? event.target.value:this.state.convert_to(event.target.value);
		console.log("value = ", value);
		this.setState({amount:value});
	}
	flipbtn(){
		this.setState(st =>({
			amount:0,
			flip:!st.flip
		}));
	}
	render (){
		const {amount,flip,to,from,convert_to,convert_from} = this.state;
		return(
		<div>
		<label htmlFor={to}>{to}</label>
		<input onChange={this.onChangValue} disabled={!flip} value={amount} id={to} placeholder={to} type='number' />
		<label htmlFor={from}>{from}</label>
		<input id={from} disabled={flip} onChange={this.onChangValue} value={convert_from(amount)} placeholder={from} type='number' />
		<button onClick={this.flipbtn}>flip</button>
		</div>
	)
	}

}	
	const base = React.createElement;
	const $root = document.getElementById("root");
	const converRender = ReactDOM.createRoot($root);
	
	const Container = ()=>{
		const arr = 
		[{"base":['minute','hour'],"convert":[x=>x*60,x=>x/60]},
		{"base":['bite','mb'],"convert":[x=>x*1024, x=>x/1024]},
		];
		const [idx,setidx] = React.useState(0);
		function optionCheck(event){
			const idx = parseInt(event.target.value);
			setidx(idx);
		}
		return (
			<div>
				<h1>converter</h1>
				<select onChange={optionCheck}>
					<option value = '0'>
						"time convert"
					</option>
					<option value = '1'>
						"size convert"
					</option>
				</select>
				{
					arr.map((v,i)=> idx === i ? base(Converter,v): null)
				}
			</div>
		);
	}

	converRender.render(<Container />);