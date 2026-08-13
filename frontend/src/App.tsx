import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;