function Btn({txt,id,fn}){
	console.log("id ="  , id);
	return <button style={{
		backgroundColor:"tomato",
		color:"white",
		padding: "10px 20px",
		border:0,
		borderRadius:10,
	}} id={id} onClick={fn}>{txt}</button>;
}

Btn.propTypes  = {
	txt : PropTypes.string,
	id : PropTypes.string,
	fn : PropTypes.func
}
function App(){
	const [value, setValue] = React.useState("set before");
	const changeValue = ()=> setValue("changed");

	return <div>
		<Btn txt ={value} id= "one" fn={changeValue} />
		<Btn txt ={1} id= "other" />
	</div>;
}
const root = document.getElementById("root");
const AppRender = ReactDOM.createRoot(root);
AppRender.render(<App />);