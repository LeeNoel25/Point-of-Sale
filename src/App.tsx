import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/NavBar'
import CreateFruit from './pages/CreateFruit/CreateFruitPage';
import POS from './pages/POS/POS';

export default function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<POS/>}/>
        <Route path="/new" element={<CreateFruit/>}/>
      </Routes>
    </Router>
  )
}


