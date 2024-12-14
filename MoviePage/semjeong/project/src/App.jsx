import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
    // <Home />
  )
}

export default App
