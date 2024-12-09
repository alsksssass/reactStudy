import {
	BrowserRouter,
	Routes,
	Route
  } from "react-router";;

import Home from "./pages/home"
import Download from "./pages/download"

function App() {
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
      <Route path="download" element={<Download />} />
		</Routes>
		</BrowserRouter>
	)
}
  export default App
