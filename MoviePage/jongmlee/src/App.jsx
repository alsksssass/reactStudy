import {
	BrowserRouter as Router, Routes, Route
} from "react-router-dom"
import Home from "./routes/Home"
import Detail from "./routes/Detail"
 
function App() {
	return <Router>
		<Routes>
			<Route path="/hello" element={<h1>Hello</h1>} />
			<Route path="/movie/:id" element={<Detail />}/>
			<Route path="/" element={<Home />}/>
		</Routes>
	</Router>;
}

export default App
