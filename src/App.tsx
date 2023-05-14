import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/NavBar'
import CreateProduct from './pages/CreateProduct/CreateProductPage';
import POS from './pages/POS/POS';

export type LineItemType = {
  _id: string,
  name: string,
  imgurl: string;
  price: number;
  brand: string;
  quantity: number;
};

export default function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<POS/>}/>
        <Route path="/new" element={<CreateProduct/>}/>
      </Routes>
    </Router>
  )
}


