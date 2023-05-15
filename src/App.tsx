import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/NavBar'
import CreateProduct from './pages/CreateProduct/CreateProductPage';
import CheckoutHistoryPage from './pages/CheckoutHistory/CheckoutHistoryPage';
import POS from './pages/POS/POS';

export type LineItemType = {
  _id: string,
  name: string,
  imgurl: string;
  price: number;
  brand: string;
  quantity: number;
};

export type SaleType = {
  _id: string;
  items: LineItemType[];
  total: number;
  timestamps: string;
};


export default function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<POS/>}/>
        <Route path="/new" element={<CreateProduct/>}/>
        <Route path="/history" element={<CheckoutHistoryPage/>}/>
      </Routes>
    </Router>
  )
}


