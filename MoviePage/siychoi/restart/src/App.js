import {
  HashRouter,
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import List from "./routes/List";
import "./input.css";

function App() {
  return (
      <HashRouter>
        <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/detail/:id`} element={<Detail />} />
        <Route path={`/list`} element={<List />} />
        </Routes>
      </HashRouter>
  );
}

export default App;