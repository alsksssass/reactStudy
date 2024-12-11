import {
	BrowserRouter,
	Routes,
	Route
  } from "react-router";;

import Home from "./pages/home"
import Download from "./pages/download"
import DownloadSetPage from "./pages/downloadSetPage";

function App() {
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
      		<Route path="download" element={<Download />}>
			<Route path=":url" element={<DownloadSetPage />} />
			</Route>
		</Routes>
		</BrowserRouter>
	)
}
  export default App
