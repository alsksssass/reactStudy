import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./routes/Home.jsx";
import Detail from "./routes/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:idx" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
